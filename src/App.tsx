/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BenefitsSection } from './components/BenefitsSection';
import { EditorShowcase } from './components/EditorShowcase';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import {
  InfoModal,
  SignInModal,
  StartBuildingModal,
  TemplatePreviewModal,
} from './components/Modals';
import { Navbar } from './components/Navbar';
import { PricingSection } from './components/PricingSection';
import { ProductTourSection } from './components/ProductTourSection';
import { TemplatesSection } from './components/TemplatesSection';
import {
  AccentColorId,
  APP_TEMPLATES,
  AppTemplate,
  InfoModalTopic,
} from './data/appforgeData';

export default function App() {
  const [activeEditorTemplate, setActiveEditorTemplate] = useState<AppTemplate>(
    APP_TEMPLATES[0]
  );

  const [startModalOpen, setStartModalOpen] = useState(false);
  const [startModalSeed, setStartModalSeed] = useState<{
    appName?: string;
    accent?: AccentColorId;
    plan?: string;
  }>({});

  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<AppTemplate | null>(
    null
  );
  const [infoTopic, setInfoTopic] = useState<InfoModalTopic | null>(null);

  const openStartBuilding = (seed?: {
    appName?: string;
    accent?: AccentColorId;
    plan?: string;
  }) => {
    setStartModalSeed(seed ?? {});
    setStartModalOpen(true);
  };

  const handleLoadInEditor = (template: AppTemplate) => {
    setActiveEditorTemplate(template);
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#121316]">
      <Navbar
        onOpenSignIn={() => setSignInModalOpen(true)}
        onOpenStartBuilding={() => openStartBuilding()}
      />

      <main>
        {/* 1. Hero: Promise + Interactive Builder Workbench */}
        <HeroSection onStartBuilding={() => openStartBuilding()} />

        <EditorShowcase
          activeTemplate={activeEditorTemplate}
          onSelectTemplate={setActiveEditorTemplate}
          onUseCustomApp={(appTitle, accent) =>
            openStartBuilding({ appName: appTitle, accent })
          }
        />

        {/* 2. From idea to app */}
        <HowItWorksSection />

        {/* 3. Interactive product tour */}
        <ProductTourSection onLoadTemplateInBuilder={handleLoadInEditor} />

        {/* 4. Templates */}
        <TemplatesSection
          onPreviewTemplate={(tpl) => setPreviewTemplate(tpl)}
          onLoadInEditor={handleLoadInEditor}
        />

        {/* 5. Features */}
        <BenefitsSection />

        {/* Pricing */}
        <PricingSection
          onSelectPlan={(planId) => openStartBuilding({ plan: planId })}
        />

        {/* 6. Closing CTA */}
        <FinalCtaSection onStartBuilding={() => openStartBuilding()} />
      </main>

      <Footer
        onOpenInfo={(topic) => setInfoTopic(topic)}
        onStartBuilding={() => openStartBuilding()}
      />

      {/* Interactive Modals */}
      <StartBuildingModal
        open={startModalOpen}
        initialAppName={startModalSeed.appName}
        initialAccent={startModalSeed.accent}
        initialPlan={startModalSeed.plan}
        onClose={() => setStartModalOpen(false)}
        onLaunchInSandbox={handleLoadInEditor}
      />

      <SignInModal
        open={signInModalOpen}
        onClose={() => setSignInModalOpen(false)}
      />

      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onLoadInEditor={handleLoadInEditor}
      />

      <InfoModal topic={infoTopic} onClose={() => setInfoTopic(null)} />
    </div>
  );
}
