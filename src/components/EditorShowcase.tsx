import {
  ArrowDown,
  ArrowUp,
  Check,
  GripVertical,
  Layers,
  Monitor,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  Smartphone,
  Trash2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { DragEvent, useState } from 'react';
import {
  ACCENT_PALETTES,
  AccentColorId,
  APP_TEMPLATES,
  AppTemplate,
  COMPONENT_CATALOG,
  EditorBlock,
  PaletteComponentItem,
} from '../data/appforgeData';

interface EditorShowcaseProps {
  activeTemplate: AppTemplate;
  onSelectTemplate: (template: AppTemplate) => void;
  onUseCustomApp: (appTitle: string, accent: AccentColorId) => void;
}

type MobileEditorTab = 'components' | 'canvas' | 'preview';

function createBlockFromCatalog(item: PaletteComponentItem): EditorBlock {
  const uniqueId = `blk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  return {
    id: uniqueId,
    type: item.type,
    label: item.label,
    description: item.hint,
    enabled: true,
    title: item.defaultTitle,
    subtitle: item.defaultSubtitle,
    ctaText: item.type === 'action' ? item.defaultTitle : undefined,
    items: item.defaultItems
      ? item.defaultItems.map((entry) => ({ ...entry }))
      : undefined,
  };
}

export function EditorShowcase({
  activeTemplate,
  onSelectTemplate,
  onUseCustomApp,
}: EditorShowcaseProps) {
  const [blocks, setBlocks] = useState<EditorBlock[]>(() =>
    activeTemplate.blocks.map((b) => ({
      ...b,
      items: b.items ? b.items.map((i) => ({ ...i })) : undefined,
    }))
  );
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(
    activeTemplate.blocks[1]?.id ?? activeTemplate.blocks[0]?.id ?? null
  );
  const [accentId, setAccentId] = useState<AccentColorId>(activeTemplate.accent);
  const [cornerStyle, setCornerStyle] = useState<'rounded' | 'crisp'>('rounded');
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [mobilePane, setMobilePane] = useState<MobileEditorTab>('canvas');
  const [isBlankMode, setIsBlankMode] = useState(false);

  const [dragSource, setDragSource] = useState<
    | { kind: 'catalog'; item: PaletteComponentItem }
    | { kind: 'canvas'; blockId: string }
    | null
  >(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [isCanvasDragOver, setIsCanvasDragOver] = useState(false);

  const [loadedTemplateId, setLoadedTemplateId] = useState<string>(activeTemplate.id);
  if (loadedTemplateId !== activeTemplate.id) {
    setLoadedTemplateId(activeTemplate.id);
    setBlocks(
      activeTemplate.blocks.map((b) => ({
        ...b,
        items: b.items ? b.items.map((i) => ({ ...i })) : undefined,
      }))
    );
    setSelectedBlockId(
      activeTemplate.blocks[1]?.id ?? activeTemplate.blocks[0]?.id ?? null
    );
    setAccentId(activeTemplate.accent);
    setIsBlankMode(false);
  }

  const [previewSubmitted, setPreviewSubmitted] = useState(false);
  const [previewInputValue, setPreviewInputValue] = useState('alex@northstudio.co');

  const accent =
    ACCENT_PALETTES.find((p) => p.id === accentId) ?? ACCENT_PALETTES[0];
  const selectedBlock =
    blocks.find((b) => b.id === selectedBlockId) ?? blocks[0] ?? null;
  const radiusClass = cornerStyle === 'rounded' ? 'rounded-xl' : 'rounded-sm';
  const btnRadiusClass = cornerStyle === 'rounded' ? 'rounded-lg' : 'rounded-sm';

  const handleTemplateSwitch = (tpl: AppTemplate) => {
    setIsBlankMode(false);
    onSelectTemplate(tpl);
    setBlocks(
      tpl.blocks.map((b) => ({
        ...b,
        items: b.items ? b.items.map((i) => ({ ...i })) : undefined,
      }))
    );
    setSelectedBlockId(tpl.blocks[1]?.id ?? tpl.blocks[0]?.id ?? null);
    setAccentId(tpl.accent);
    setPreviewSubmitted(false);
  };

  const handleBlankCanvas = () => {
    setIsBlankMode(true);
    setBlocks([]);
    setSelectedBlockId(null);
    setPreviewSubmitted(false);
    setMobilePane('canvas');
  };

  const handleReset = () => {
    setIsBlankMode(false);
    handleTemplateSwitch(activeTemplate);
    setCornerStyle('rounded');
  };

  const insertCatalogBlockAt = (item: PaletteComponentItem, index?: number) => {
    const newBlock = createBlockFromCatalog(item);
    setBlocks((prev) => {
      const targetIndex =
        typeof index === 'number' && index >= 0 && index <= prev.length
          ? index
          : prev.length;
      const next = [...prev];
      next.splice(targetIndex, 0, newBlock);
      return next;
    });
    setSelectedBlockId(newBlock.id);
    setPreviewSubmitted(false);
    setMobilePane('canvas');
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => {
      const next = prev.filter((b) => b.id !== id);
      if (selectedBlockId === id) {
        setSelectedBlockId(next[0]?.id ?? null);
      }
      return next;
    });
    setPreviewSubmitted(false);
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      copy.splice(targetIdx, 0, item);
      return copy;
    });
  };

  const updateSelectedBlockField = (
    field: 'title' | 'subtitle',
    value: string
  ) => {
    if (!selectedBlock) return;
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === selectedBlock.id
          ? {
              ...block,
              [field]: value,
              ctaText:
                field === 'title' && block.type === 'action'
                  ? value
                  : block.ctaText,
            }
          : block
      )
    );
  };

  const togglePreviewItem = (blockId: string, itemIndex: number) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== blockId || !block.items) return block;
        const nextItems = block.items.map((item, i) => {
          if (block.type === 'schedule') {
            return { ...item, checked: i === itemIndex };
          }
          return i === itemIndex ? { ...item, checked: !item.checked } : item;
        });
        return { ...block, items: nextItems };
      })
    );
  };

  const handleCatalogDragStart = (
    e: DragEvent<HTMLElement>,
    item: PaletteComponentItem
  ) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/appforge-type', item.type);
    setDragSource({ kind: 'catalog', item });
  };

  const handleCanvasBlockDragStart = (
    e: DragEvent<HTMLElement>,
    blockId: string
  ) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/appforge-block-id', blockId);
    setDragSource({ kind: 'canvas', blockId });
  };

  const handleDragEnd = () => {
    setDragSource(null);
    setDropIndex(null);
    setIsCanvasDragOver(false);
  };

  const handleSlotDragOver = (e: DragEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = dragSource?.kind === 'canvas' ? 'move' : 'copy';
    setIsCanvasDragOver(true);
    if (dropIndex !== index) {
      setDropIndex(index);
    }
  };

  const handleCanvasDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = dragSource?.kind === 'canvas' ? 'move' : 'copy';
    if (!isCanvasDragOver) {
      setIsCanvasDragOver(true);
    }
    if (dropIndex === null) {
      setDropIndex(blocks.length);
    }
  };

  const executeDropAt = (e: DragEvent<HTMLElement>, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();

    const catalogType = e.dataTransfer.getData('application/appforge-type');
    const movedBlockId = e.dataTransfer.getData('application/appforge-block-id');

    if (catalogType) {
      const catalogItem = COMPONENT_CATALOG.find((c) => c.type === catalogType);
      if (catalogItem) {
        insertCatalogBlockAt(catalogItem, targetIndex);
      }
    } else if (dragSource?.kind === 'catalog') {
      insertCatalogBlockAt(dragSource.item, targetIndex);
    } else if (movedBlockId || dragSource?.kind === 'canvas') {
      const idToMove =
        movedBlockId ||
        (dragSource?.kind === 'canvas' ? dragSource.blockId : '');
      setBlocks((prev) => {
        const fromIdx = prev.findIndex((b) => b.id === idToMove);
        if (fromIdx === -1) return prev;
        const copy = [...prev];
        const [moved] = copy.splice(fromIdx, 1);
        const adjustedTarget =
          fromIdx < targetIndex ? Math.max(0, targetIndex - 1) : targetIndex;
        copy.splice(adjustedTarget, 0, moved);
        return copy;
      });
    }

    handleDragEnd();
  };

  const headerBlock = blocks.find((b) => b.type === 'header');
  const appTitleDisplay = headerBlock?.title || activeTemplate.appTitle;

  return (
    <section
      id="product"
      aria-label="AppForge visual editor preview"
      className="scroll-mt-16 pb-16 sm:pb-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-2xl border border-[#DFDDD6] bg-white shadow-[0_24px_56px_-24px_rgba(18,19,22,0.14)]"
        >
          {/* Editor Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E6E0] bg-[#FAF9F6] px-4 py-2.5 sm:px-5">
            {/* Left: Project Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-[#6B6E75]">
                App screen
              </span>
              <div
                role="tablist"
                aria-label="Example app canvases"
                className="flex flex-wrap items-center gap-1 rounded-lg bg-[#EEEDE8] p-1"
              >
                {APP_TEMPLATES.slice(0, 3).map((tpl) => {
                  const isActive = !isBlankMode && tpl.id === activeTemplate.id;
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleTemplateSwitch(tpl)}
                      className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
                        isActive
                          ? 'bg-white text-[#121316] shadow-xs'
                          : 'text-[#4B4E54] hover:text-[#121316]'
                      }`}
                    >
                      {tpl.appTitle}
                    </button>
                  );
                })}
                <button
                  type="button"
                  role="tab"
                  aria-selected={isBlankMode}
                  onClick={handleBlankCanvas}
                  className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
                    isBlankMode
                      ? 'bg-white text-[#121316] shadow-xs'
                      : 'text-[#4B4E54] hover:text-[#121316]'
                  }`}
                >
                  Start blank
                </button>
              </div>
            </div>

            {/* Right: Device Toggle & Actions */}
            <div className="flex items-center gap-2">
              <div
                role="group"
                aria-label="Preview device size"
                className="flex items-center gap-1 rounded-lg bg-[#EEEDE8] p-1"
              >
                <button
                  type="button"
                  onClick={() => setDeviceMode('mobile')}
                  aria-pressed={deviceMode === 'mobile'}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
                    deviceMode === 'mobile'
                      ? 'bg-white text-[#121316] shadow-xs'
                      : 'text-[#4B4E54] hover:text-[#121316]'
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Mobile</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceMode('desktop')}
                  aria-pressed={deviceMode === 'desktop'}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
                    deviceMode === 'desktop'
                      ? 'bg-white text-[#121316] shadow-xs'
                      : 'text-[#4B4E54] hover:text-[#121316]'
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Desktop</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                title="Reset editor changes"
                aria-label="Reset editor changes"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E4E2DC] bg-white text-[#4B4E54] transition-colors hover:bg-[#F2F1EC] hover:text-[#121316]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onUseCustomApp(appTitleDisplay, accentId)}
                className="hidden whitespace-nowrap rounded-lg bg-[#121316] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#27292E] sm:inline-flex"
              >
                Use this layout
              </button>
            </div>
          </div>

          {/* Mobile Pane Switcher */}
          <div className="flex border-b border-[#E8E6E0] bg-white px-3 py-2 lg:hidden">
            <div className="grid w-full grid-cols-3 gap-1 rounded-lg bg-[#F2F1EC] p-1">
              {(
                [
                  { id: 'components', label: 'Components' },
                  { id: 'canvas', label: 'Canvas' },
                  { id: 'preview', label: 'Live Preview' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMobilePane(tab.id)}
                  className={`min-h-[36px] whitespace-nowrap rounded-md px-2 text-xs font-medium transition-colors ${
                    mobilePane === tab.id
                      ? 'bg-white text-[#121316] shadow-xs'
                      : 'text-[#4B4E54]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main 3-Pane Editor Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Pane 1: Component Panel */}
            <aside
              aria-label="Component panel"
              className={`border-b border-[#E8E6E0] bg-[#FAF9F6] p-4 lg:col-span-3 lg:border-r lg:border-b-0 ${
                mobilePane === 'components' ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#121316]">
                  <Layers className="h-3.5 w-3.5 text-[#1D4ED8]" aria-hidden="true" />
                  <span>Components</span>
                </div>
                <span className="font-mono text-[11px] text-[#6B6E75]">
                  Drag or +
                </span>
              </div>

              <div className="mt-2.5 space-y-1.5">
                {COMPONENT_CATALOG.map((item) => (
                  <div
                    key={item.type}
                    draggable
                    onDragStart={(e) => handleCatalogDragStart(e, item)}
                    onDragEnd={handleDragEnd}
                    className="group flex cursor-grab items-center justify-between gap-2 rounded-lg border border-[#E4E2DC] bg-white px-2.5 py-2 transition-all hover:border-[#1D4ED8]/45 hover:bg-[#F8FAFF] active:cursor-grabbing"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <GripVertical
                        className="h-3.5 w-3.5 shrink-0 text-[#9CA0A8] group-hover:text-[#1D4ED8]"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <div className="truncate text-xs font-medium text-[#121316]">
                          {item.label}
                        </div>
                        <div className="truncate text-[11px] text-[#6B6E75]">
                          {item.hint}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => insertCatalogBlockAt(item)}
                      aria-label={`Add ${item.label} to canvas`}
                      title={`Add ${item.label} to canvas`}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#E4E2DC] bg-[#FAF9F6] text-[#2E3035] transition-colors hover:border-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Theme & Style Controls */}
              <div className="mt-4 border-t border-[#E4E2DC] pt-3.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#121316]">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-[#1D4ED8]" aria-hidden="true" />
                  <span>App style</span>
                </div>

                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-[#6B6E75]">
                    Accent
                  </span>
                  <div className="flex items-center gap-1.5">
                    {ACCENT_PALETTES.map((palette) => {
                      const active = palette.id === accentId;
                      return (
                        <button
                          key={palette.id}
                          type="button"
                          onClick={() => setAccentId(palette.id)}
                          aria-label={`Set accent color to ${palette.label}`}
                          aria-pressed={active}
                          className={`flex h-6 w-6 items-center justify-center rounded-full border transition-transform ${
                            active
                              ? 'scale-110 border-[#121316] ring-2 ring-[#121316]/15'
                              : 'border-black/10 hover:scale-105'
                          }`}
                          style={{ backgroundColor: palette.hex }}
                        >
                          {active && <Check className="h-3 w-3 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-1 rounded-lg bg-[#EEEDE8] p-1">
                  <button
                    type="button"
                    onClick={() => setCornerStyle('rounded')}
                    className={`rounded-md py-1 text-xs font-medium transition-colors ${
                      cornerStyle === 'rounded'
                        ? 'bg-white text-[#121316] shadow-xs'
                        : 'text-[#4B4E54]'
                    }`}
                  >
                    Rounded
                  </button>
                  <button
                    type="button"
                    onClick={() => setCornerStyle('crisp')}
                    className={`rounded-md py-1 text-xs font-medium transition-colors ${
                      cornerStyle === 'crisp'
                        ? 'bg-white text-[#121316] shadow-xs'
                        : 'text-[#4B4E54]'
                    }`}
                  >
                    Crisp
                  </button>
                </div>
              </div>
            </aside>

            {/* Pane 2: Central App Canvas */}
            <div
              aria-label="Central app canvas"
              className={`border-b border-[#E8E6E0] bg-[#F3F2EE] p-4 sm:p-5 lg:col-span-5 lg:border-r lg:border-b-0 ${
                mobilePane === 'canvas' ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#121316]">
                    App canvas
                  </span>
                  <span className="ml-2 text-xs text-[#6B6E75]">
                    Drag blocks to arrange
                  </span>
                </div>
                <span className="font-mono text-[11px] tabular-nums text-[#6B6E75]">
                  {blocks.length} {blocks.length === 1 ? 'block' : 'blocks'}
                </span>
              </div>

              {/* Selected Block Quick Property Bar */}
              {selectedBlock ? (
                <div className="mt-2.5 flex flex-wrap items-center gap-2 rounded-lg border border-[#E4E2DC] bg-white px-3 py-2">
                  <label
                    htmlFor="canvas-block-label"
                    className="shrink-0 text-[11px] font-medium text-[#6B6E75]"
                  >
                    {selectedBlock.label}
                  </label>
                  <input
                    id="canvas-block-label"
                    type="text"
                    value={selectedBlock.title}
                    onChange={(e) =>
                      updateSelectedBlockField('title', e.target.value)
                    }
                    maxLength={40}
                    className="min-w-0 flex-1 rounded-md border border-[#E4E2DC] bg-[#FAF9F6] px-2.5 py-1 text-xs font-medium text-[#121316] focus:border-[#1D4ED8] focus:bg-white focus:outline-none"
                  />
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveBlock(selectedBlock.id, 'up')}
                      disabled={blocks[0]?.id === selectedBlock.id}
                      aria-label="Move selected block up"
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E4E2DC] text-[#4B4E54] transition-colors hover:bg-[#F3F2EE] disabled:opacity-35"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBlock(selectedBlock.id, 'down')}
                      disabled={blocks[blocks.length - 1]?.id === selectedBlock.id}
                      aria-label="Move selected block down"
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E4E2DC] text-[#4B4E54] transition-colors hover:bg-[#F3F2EE] disabled:opacity-35"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBlock(selectedBlock.id)}
                      aria-label="Remove selected block"
                      title="Remove block"
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E4E2DC] text-[#6B6E75] transition-colors hover:border-[#FECACA] hover:bg-[#FEF2F2] hover:text-[#B91C1C]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-2.5 rounded-lg border border-[#E4E2DC] bg-white px-3 py-2 text-xs text-[#6B6E75]">
                  Drop a component below to inspect and edit its text.
                </div>
              )}

              {/* Droppable Visual Canvas Frame */}
              <div
                onDragOver={handleCanvasDragOver}
                onDragLeave={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setIsCanvasDragOver(false);
                    setDropIndex(null);
                  }
                }}
                onDrop={(e) =>
                  executeDropAt(e, dropIndex ?? blocks.length)
                }
                className={`mt-2.5 min-h-[340px] rounded-xl border p-3 transition-colors ${
                  isCanvasDragOver
                    ? 'border-2 border-[#1D4ED8] bg-[#EFF6FF]/40'
                    : 'border-[#DCD9D0] bg-white'
                }`}
                style={{
                  backgroundImage:
                    'radial-gradient(#E4E2DC 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              >
                {blocks.length === 0 ? (
                  <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-[#C9C5BC] bg-white/85 p-6 text-center">
                    <p className="font-display text-sm font-semibold text-[#121316]">
                      Your canvas is empty
                    </p>
                    <p className="mt-1 max-w-xs text-xs leading-relaxed text-[#6B6E75]">
                      Drag any component from the left panel and drop it here, or click a block below.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {COMPONENT_CATALOG.slice(0, 3).map((item) => (
                        <button
                          key={item.type}
                          type="button"
                          onClick={() => insertCatalogBlockAt(item)}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#D8D5CD] bg-white px-3 py-1.5 text-xs font-medium text-[#121316] transition-colors hover:border-[#1D4ED8] hover:text-[#1D4ED8]"
                        >
                          <Plus className="h-3 w-3" />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {blocks.map((block, index) => {
                      const isSelected = block.id === selectedBlock?.id;
                      const showTopIndicator =
                        isCanvasDragOver && dropIndex === index;

                      return (
                        <div key={block.id}>
                          <div
                            onDragOver={(e) => handleSlotDragOver(e, index)}
                            onDrop={(e) => executeDropAt(e, index)}
                            className={`transition-all ${
                              showTopIndicator
                                ? 'my-1.5 h-1.5 rounded-full bg-[#1D4ED8]'
                                : 'h-0.5'
                            }`}
                          />

                          <div
                            draggable
                            onDragStart={(e) =>
                              handleCanvasBlockDragStart(e, block.id)
                            }
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => {
                              const rect =
                                e.currentTarget.getBoundingClientRect();
                              const isLowerHalf =
                                e.clientY - rect.top > rect.height / 2;
                              handleSlotDragOver(
                                e,
                                isLowerHalf ? index + 1 : index
                              );
                            }}
                            onDrop={(e) => {
                              const rect =
                                e.currentTarget.getBoundingClientRect();
                              const isLowerHalf =
                                e.clientY - rect.top > rect.height / 2;
                              executeDropAt(
                                e,
                                isLowerHalf ? index + 1 : index
                              );
                            }}
                            onClick={() => setSelectedBlockId(block.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedBlockId(block.id);
                              }
                            }}
                            className={`group relative cursor-pointer bg-white p-2.5 text-left transition-all duration-150 ${radiusClass} ${
                              isSelected
                                ? 'border-2 border-[#1D4ED8] shadow-xs'
                                : 'border border-[#E4E2DC] hover:border-[#B8B4AA]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5">
                                <GripVertical
                                  className="h-3.5 w-3.5 cursor-grab text-[#9CA0A8] group-hover:text-[#4B4E54]"
                                  aria-hidden="true"
                                />
                                <span className="text-[11px] font-medium text-[#6B6E75]">
                                  {block.label}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                {isSelected && (
                                  <span className="text-[11px] font-semibold text-[#1D4ED8]">
                                    Selected
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeBlock(block.id);
                                  }}
                                  aria-label={`Remove ${block.label}`}
                                  className="rounded p-0.5 text-[#9CA0A8] opacity-0 transition-opacity hover:text-[#B91C1C] group-hover:opacity-100 focus:opacity-100"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>

                            {block.type === 'header' && (
                              <div className="mt-1 flex items-center justify-between">
                                <span className="font-display text-sm font-semibold text-[#121316]">
                                  {block.title}
                                </span>
                                <span
                                  className="text-[11px] font-medium"
                                  style={{ color: accent.text }}
                                >
                                  {block.subtitle}
                                </span>
                              </div>
                            )}

                            {block.type === 'summary' && (
                              <div className="mt-1">
                                <div className="text-xs font-semibold text-[#121316]">
                                  {block.title}
                                </div>
                                <p className="mt-0.5 truncate text-[11px] text-[#6B6E75]">
                                  {block.subtitle}
                                </p>
                              </div>
                            )}

                            {block.type === 'metric' && (
                              <div className="mt-1 grid grid-cols-2 gap-1.5">
                                {block.items?.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="rounded border border-[#F0EEE9] bg-[#FAF9F6] px-2 py-1"
                                  >
                                    <div className="text-[10px] text-[#6B6E75]">
                                      {item.label}
                                    </div>
                                    <div className="text-xs font-semibold text-[#121316]">
                                      {item.meta}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {(block.type === 'schedule' ||
                              block.type === 'checklist') && (
                              <div className="mt-1 space-y-1">
                                <div className="text-xs font-semibold text-[#121316]">
                                  {block.title}
                                </div>
                                {block.items?.slice(0, 2).map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between rounded border border-[#F0EEE9] bg-[#FAF9F6] px-2 py-1 text-[11px]"
                                  >
                                    <span className="truncate text-[#2E3035]">
                                      {item.label}
                                    </span>
                                    <span className="shrink-0 text-[#6B6E75]">
                                      {item.meta}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {block.type === 'form' && (
                              <div className="mt-1">
                                <div className="text-xs font-semibold text-[#121316]">
                                  {block.title}
                                </div>
                                <div className="mt-1 h-6 rounded border border-[#E4E2DC] bg-[#FAF9F6] px-2 text-[11px] leading-6 text-[#9CA0A8]">
                                  {block.subtitle || 'Input field'}
                                </div>
                              </div>
                            )}

                            {block.type === 'action' && (
                              <div
                                className={`mt-1 py-1.5 text-center text-xs font-medium text-white ${btnRadiusClass}`}
                                style={{ backgroundColor: accent.hex }}
                              >
                                {block.title}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div
                      onDragOver={(e) => handleSlotDragOver(e, blocks.length)}
                      onDrop={(e) => executeDropAt(e, blocks.length)}
                      className={`mt-2 flex items-center justify-center rounded-lg border border-dashed py-2 text-[11px] transition-colors ${
                        isCanvasDragOver && dropIndex === blocks.length
                          ? 'border-[#1D4ED8] bg-[#EFF6FF] font-medium text-[#1D4ED8]'
                          : 'border-[#D8D5CD] bg-white/75 text-[#6B6E75]'
                      }`}
                    >
                      Drop another component here
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pane 3: Live Interactive Mobile / Desktop Preview */}
            <div
              aria-label="Live app preview"
              className={`bg-[#FAF9F6] p-4 sm:p-5 lg:col-span-4 ${
                mobilePane === 'preview' ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#121316]">
                  Live preview
                </span>
                <span className="font-mono text-[11px] tabular-nums text-[#6B6E75]">
                  {deviceMode === 'mobile' ? '375 × 667' : 'Desktop view'}
                </span>
              </div>

              <div className="mt-2.5 flex justify-center">
                <div
                  className={`w-full border border-[#D8D5CD] bg-white shadow-sm transition-all duration-200 ${
                    deviceMode === 'mobile'
                      ? 'max-w-[292px] rounded-[24px] p-3.5'
                      : 'rounded-xl p-4'
                  }`}
                >
                  {deviceMode === 'mobile' ? (
                    <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-[#E4E2DC]" />
                  ) : (
                    <div className="mb-3 flex items-center justify-between border-b border-[#F0EEE9] pb-2">
                      <span className="font-mono text-[11px] text-[#6B6E75]">
                        appforge.link/{isBlankMode ? 'custom' : activeTemplate.id}
                      </span>
                      <span className="text-[11px] font-medium text-[#6B6E75]">
                        Responsive
                      </span>
                    </div>
                  )}

                  {blocks.filter((b) => b.enabled).length === 0 ? (
                    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-[#E4E2DC] bg-[#FAF9F6] p-4 text-center">
                      <p className="text-xs font-medium text-[#2E3035]">
                        Preview updates automatically
                      </p>
                      <p className="mt-1 text-[11px] text-[#6B6E75]">
                        Drop any component onto the canvas to see it rendered here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {blocks
                        .filter((b) => b.enabled)
                        .map((block) => {
                          if (block.type === 'header') {
                            return (
                              <div
                                key={block.id}
                                className="flex items-center justify-between border-b border-[#F0EEE9] pb-2"
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`flex h-6 w-6 items-center justify-center text-[11px] font-bold text-white ${btnRadiusClass}`}
                                    style={{ backgroundColor: accent.hex }}
                                  >
                                    {(block.title || 'A')
                                      .slice(0, 1)
                                      .toUpperCase()}
                                  </span>
                                  <span className="font-display text-sm font-semibold text-[#121316]">
                                    {block.title}
                                  </span>
                                </div>
                                <span className="text-[11px] text-[#6B6E75]">
                                  {block.subtitle}
                                </span>
                              </div>
                            );
                          }

                          if (block.type === 'summary') {
                            return (
                              <div
                                key={block.id}
                                className={`p-3 ${radiusClass}`}
                                style={{ backgroundColor: accent.softBg }}
                              >
                                <div
                                  className="text-sm font-semibold"
                                  style={{ color: accent.text }}
                                >
                                  {block.title}
                                </div>
                                {block.subtitle && (
                                  <p className="mt-1 text-xs leading-relaxed text-[#2E3035]">
                                    {block.subtitle}
                                  </p>
                                )}
                              </div>
                            );
                          }

                          if (block.type === 'metric') {
                            return (
                              <div key={block.id} className="space-y-1.5">
                                <div className="text-xs font-semibold text-[#121316]">
                                  {block.title}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {block.items?.map((item, idx) => (
                                    <div
                                      key={idx}
                                      className={`border border-[#E4E2DC] bg-[#FAF9F6] p-2.5 ${btnRadiusClass}`}
                                    >
                                      <div className="text-[11px] text-[#6B6E75]">
                                        {item.label}
                                      </div>
                                      <div className="mt-0.5 font-display text-sm font-semibold text-[#121316]">
                                        {item.meta}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          if (
                            block.type === 'schedule' ||
                            block.type === 'checklist'
                          ) {
                            return (
                              <div key={block.id} className="space-y-1.5">
                                <div className="text-xs font-semibold text-[#121316]">
                                  {block.title}
                                </div>
                                <div className="space-y-1.5">
                                  {block.items?.map((item, idx) => (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() =>
                                        togglePreviewItem(block.id, idx)
                                      }
                                      className={`flex w-full items-center justify-between gap-2 border px-2.5 py-2 text-left transition-colors ${btnRadiusClass} ${
                                        item.checked
                                          ? 'border-[#121316]/20 bg-[#FAF9F6]'
                                          : 'border-[#E4E2DC] bg-white hover:bg-[#FAF9F6]'
                                      }`}
                                      style={
                                        item.checked
                                          ? {
                                              borderColor: accent.border,
                                              backgroundColor: accent.softBg,
                                            }
                                          : undefined
                                      }
                                    >
                                      <div className="min-w-0">
                                        <div className="truncate text-xs font-medium text-[#121316]">
                                          {item.label}
                                        </div>
                                        <div className="text-[11px] text-[#6B6E75]">
                                          {item.meta}
                                        </div>
                                      </div>
                                      <span
                                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                                          item.checked
                                            ? 'border-transparent text-white'
                                            : 'border-[#D8D5CD] bg-white'
                                        }`}
                                        style={
                                          item.checked
                                            ? { backgroundColor: accent.hex }
                                            : undefined
                                        }
                                      >
                                        {item.checked && (
                                          <Check className="h-2.5 w-2.5" />
                                        )}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          if (block.type === 'form') {
                            return (
                              <div key={block.id} className="space-y-1.5">
                                <label
                                  htmlFor={`preview-input-${block.id}`}
                                  className="block text-xs font-semibold text-[#121316]"
                                >
                                  {block.title}
                                </label>
                                <input
                                  id={`preview-input-${block.id}`}
                                  type="text"
                                  value={previewInputValue}
                                  onChange={(e) => {
                                    setPreviewInputValue(e.target.value);
                                    setPreviewSubmitted(false);
                                  }}
                                  placeholder={
                                    block.subtitle || 'Enter your email or note'
                                  }
                                  className={`w-full border border-[#D8D5CD] bg-white px-2.5 py-1.5 text-xs text-[#121316] focus:border-[#1D4ED8] focus:outline-none ${btnRadiusClass}`}
                                />
                              </div>
                            );
                          }

                          if (block.type === 'action') {
                            return (
                              <div key={block.id} className="pt-1">
                                <button
                                  type="button"
                                  onClick={() => setPreviewSubmitted(true)}
                                  className={`w-full py-2.5 text-xs font-medium text-white transition-opacity hover:opacity-90 ${btnRadiusClass}`}
                                  style={{ backgroundColor: accent.hex }}
                                >
                                  {block.title}
                                </button>
                                {previewSubmitted && (
                                  <p className="mt-2 text-center text-[11px] font-medium text-[#047857]">
                                    Action tested in live preview
                                  </p>
                                )}
                              </div>
                            );
                          }

                          return null;
                        })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
