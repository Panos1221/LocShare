import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Users, Zap, Globe } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass p-6 rounded-3xl border border-white/10 hover:border-primary/50 transition-all group"
  >
    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

export const HowItWorksSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 relative" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-bold mb-6">{t('howItWorks.title')}</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Users}
            title={t('howItWorks.step1.title')}
            description={t('howItWorks.step1.description')}
            delay={0}
          />
          <FeatureCard
            icon={Zap}
            title={t('howItWorks.step2.title')}
            description={t('howItWorks.step2.description')}
            delay={0.2}
          />
          <FeatureCard
            icon={Globe}
            title={t('howItWorks.step3.title')}
            description={t('howItWorks.step3.description')}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};
