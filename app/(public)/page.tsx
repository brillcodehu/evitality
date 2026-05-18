import { Hero } from "@/components/public/hero";
import { AboutSection } from "@/components/public/about-section";
import { BenefitsSection } from "@/components/public/benefits-section";
import { MyProgram } from "@/components/public/my-program";
import { BmiCalculator } from "@/components/public/bmi-calculator";
import { BlogTips } from "@/components/public/blog-tips";
import { Testimonials } from "@/components/public/testimonials";
import { CTASection } from "@/components/public/cta-section";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <BenefitsSection />
      <MyProgram />
      <BmiCalculator />
      <BlogTips />
      <Testimonials />
      <CTASection />
    </>
  );
}
