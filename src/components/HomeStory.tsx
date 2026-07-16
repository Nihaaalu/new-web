import React from "react";
import Hero from "./Hero";
import PhoneShowcase3D from "./PhoneShowcase3D";
import WhyWebsitesMatter from "./WhyWebsitesMatter";
import TransformationSection from "./TransformationSection";
import StatsSection from "./StatsSection";
import ServicesPreview from "./ServicesPreview";
import DeviceEcosystem3D from "./DeviceEcosystem3D";
import HomeCtaSection from "./HomeCtaSection";

export default function HomeStory() {
  return (
    <div className="w-full flex flex-col" id="home-story-journey">
      {/* 1. Hero Landing Cover */}
      <Hero />

      {/* 2. Premium 3D Phone Showcase with screen mockups cycle */}
      <PhoneShowcase3D />

      {/* 3. Why a Website Matters (4 Premium metrics indicators) */}
      <WhyWebsitesMatter />

      {/* 4. Phone to Website Transformation Showcase */}
      <TransformationSection />

      {/* 5. Animated count-up data statistics */}
      <StatsSection />

      {/* 6. Curated Services Preview */}
      <ServicesPreview />

      {/* 7. 3D Devices Ecosystem viewport */}
      <DeviceEcosystem3D />

      {/* 8. Final Premium End block CTA */}
      <HomeCtaSection />
    </div>
  );
}
