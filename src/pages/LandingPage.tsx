import React from 'react';
import { EcoCyberBackground } from '../components/landing/EcoCyberBackground';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { ScatteredQuotes } from '../components/landing/ScatteredQuotes';
import { WhatIsNuwi } from '../components/landing/WhatIsNuwi';
import { ScientificEvidenceSection } from '../components/landing/ScientificEvidenceSection';
import { SpecialtiesSection } from '../components/landing/SpecialtiesSection';
import { ActivitiesShowcase } from '../components/landing/ActivitiesShowcase';
import { HowItWorks } from '../components/landing/HowItWorks';
import { ContactSection } from '../components/landing/ContactSection';
import { Footer } from '../components/landing/Footer';

interface LandingPageProps {
  onEnterApp: () => void;
  hasActiveSession?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, hasActiveSession = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF5FE] via-[#F2FAFD]/60 to-[#F3FAF7]/70 text-indigo-950 flex flex-col relative selection:bg-purple-200 selection:text-purple-950">
      {/* Eco-Cyber Subtle Andean Animated Background with Soft Purple Nodes */}
      <EcoCyberBackground />

      {/* Sticky Top Navbar */}
      <Navbar onEnterApp={onEnterApp} hasActiveSession={hasActiveSession} />

      {/* Main Content Sections */}
      <main className="flex-grow z-10">
        {/* 1. Hero Section (First Impact) */}
        <HeroSection onEnterApp={onEnterApp} />

        {/* 2. Scattered Quotes (Clinical insights) */}
        <ScatteredQuotes />

        {/* 3. What is Nuwi Play? (4 Pillars & Andean Narrative) */}
        <WhatIsNuwi />

        {/* 3.1 Scientific & Neuropsychological Backing (SDT, CBT, Peer-Reviewed Papers) */}
        <ScientificEvidenceSection />

        {/* 4. Specialties (Psychology, Psychopedagogy, Speech Therapy, OT, Clinics) */}
        <SpecialtiesSection />

        {/* 5. Activities Showcase & Clinical Benefits */}
        <ActivitiesShowcase onEnterApp={onEnterApp} />

        {/* 6. How it Works (4 Clinical Steps) */}
        <HowItWorks onEnterApp={onEnterApp} />

        {/* 7. Centralized Contact & Support */}
        <ContactSection />
      </main>

      {/* Final High-Impact CTA & Footer */}
      <Footer onEnterApp={onEnterApp} />
    </div>
  );
};

export default LandingPage;
