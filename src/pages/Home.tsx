import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { CTASection } from "@/components/landing/CTASection";

const Home = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/20">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <PrivacySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
