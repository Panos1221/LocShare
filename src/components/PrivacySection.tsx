import { motion } from "framer-motion";
import { Database, Eye, Trash2, UserX } from "lucide-react";
import { useTranslation } from "react-i18next";

const features = [
  { icon: Database, key: 'noStorage' },
  { icon: Eye, key: 'voluntary' },
  { icon: Trash2, key: 'ephemeral' },
  { icon: UserX, key: 'noAccounts' },
];

export function PrivacySection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-display text-4xl font-bold sm:text-5xl">
            {t('privacy.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('privacy.description')}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl border border-border/50 p-6 shadow-soft transition-all hover:shadow-glow hover:border-primary/30"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold">
                  {t(`privacy.${feature.key}`)}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
