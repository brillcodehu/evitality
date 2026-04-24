import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Hero } from "@/components/public/hero";
import { ServicesSection } from "@/components/public/services-section";
import { PortfolioGallery } from "@/components/public/portfolio-gallery";
import { PricingSection } from "@/components/public/pricing-section";
import { Testimonials } from "@/components/public/testimonials";
import { CTASection } from "@/components/public/cta-section";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <PortfolioGallery />
        <PricingSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
