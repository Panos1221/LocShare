import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">Live Location Sharing</span>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl font-display font-bold leading-tight mb-8">
              {t('hero.title')}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                {t('hero.subtitle')}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="h-14 px-8 rounded-2xl text-lg gradient-primary shadow-lg shadow-primary/25 hover:scale-105 transition-transform duration-300">
                  {t('hero.getStarted')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-2xl text-lg border-2 hover:bg-muted/50"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.learnMore')}
              </Button>
            </div>
          </motion.div>

          <div className="relative hidden lg:block h-[600px]">
            {/* Privacy Focus Card */}
            <motion.div
              style={{ y: y1 }}
              className="absolute right-10 top-20 w-80 glass rounded-[2.5rem] p-8 shadow-2xl z-20 border border-primary/20 bg-background/30 backdrop-blur-xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
                  <Shield className="relative h-8 w-8 text-primary" />
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold mb-2">{t('privacy.title')}</h3>
              <p className="text-muted-foreground mb-6 text-sm">{t('privacy.description')}</p>

              <div className="space-y-4">
                {[
                  t('privacy.noStorage'),
                  t('privacy.voluntary'),
                  t('privacy.ephemeral'),
                  t('privacy.noAccounts')
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <span className="text-sm font-medium leading-tight">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-primary/10 to-blue-500/10 rounded-full blur-3xl animate-spin-slow pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
