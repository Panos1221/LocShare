import { motion } from "framer-motion";
import { UserPlus, Share2, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const steps = [
  { icon: UserPlus, key: 'step1' },
  { icon: Share2, key: 'step2' },
  { icon: MapPin, key: 'step3' },
];

export function HowItWorksSection() {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-display text-4xl font-bold sm:text-5xl">
            {t('howItWorks.title')}
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block" />

          <div className="grid gap-12 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Step number */}
                  <div className="mb-6 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full gradient-primary opacity-20 blur-xl" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-glow">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background font-display text-sm font-bold shadow-soft ring-4 ring-background">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="mb-3 font-display text-xl font-semibold">
                      {t(`howItWorks.${step.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`howItWorks.${step.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
