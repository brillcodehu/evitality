import { Hero } from "@/components/public/hero";
import { ServicesSection } from "@/components/public/services-section";
import { PortfolioGallery } from "@/components/public/portfolio-gallery";
import { PricingSection } from "@/components/public/pricing-section";
import { Testimonials } from "@/components/public/testimonials";
import { CTASection } from "@/components/public/cta-section";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <PortfolioGallery />
      <PricingSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
