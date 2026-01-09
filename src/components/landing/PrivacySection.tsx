import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export const PrivacySection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="glass rounded-[3rem] p-8 md:p-16 border border-white/10 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-bold mb-6">
                {t('privacy.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('privacy.description')}
              </p>

              <ul className="space-y-4">
                {[
                  t('privacy.noStorage'),
                  t('privacy.voluntary'),
                  t('privacy.ephemeral'),
                  t('privacy.noAccounts')
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-background/50 border border-white/5"
                  >
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 blur-3xl rounded-full" />
              <div className="relative glass rounded-3xl p-8 border border-white/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">🔒</div>
                  <div>
                    <div className="h-3 w-32 bg-foreground/10 rounded mb-2" />
                    <div className="h-2 w-20 bg-foreground/5 rounded" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-24 rounded-2xl bg-foreground/5 w-full" />
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-24 rounded-lg bg-primary/20" />
                    <div className="h-8 w-24 rounded-lg bg-foreground/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
