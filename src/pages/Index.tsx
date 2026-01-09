import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Shield, Zap, Globe, Users, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

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

const Index = () => {
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
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/20">
      <Header />

      <main>
        {/* Hero Section */}
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
                  <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl text-lg border-2 hover:bg-muted/50">
                    {t('hero.learnMore')}
                  </Button>
                </div>
              </motion.div>

              <div className="relative hidden lg:block h-[600px]">
                <motion.div style={{ y: y1 }} className="absolute right-0 top-0 w-64 h-80 glass rounded-3xl p-4 shadow-2xl z-20 border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="h-2 w-20 bg-muted rounded mb-1" />
                      <div className="h-2 w-12 bg-muted/50 rounded" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-16 rounded-xl bg-muted/20 w-full animate-pulse" />
                    <div className="h-16 rounded-xl bg-muted/20 w-full animate-pulse delay-75" />
                    <div className="h-16 rounded-xl bg-muted/20 w-full animate-pulse delay-150" />
                  </div>
                </motion.div>

                <motion.div style={{ y: y2 }} className="absolute left-10 bottom-20 w-72 h-44 glass rounded-3xl p-6 shadow-2xl z-30 border border-primary/20">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-lg">Active Now</h4>
                    <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium animate-pulse">Live</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    {/* Show a 'Real Time' styled clock or counter since we can't show real users yet */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold font-mono tracking-tight">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Local Time</span>
                    </div>
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-2/3 animate-pulse" />
                    </div>
                    <p className="text-xs text-muted-foreground">System Operational</p>
                  </div>
                </motion.div>

                {/* Abstract decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-primary/10 to-blue-500/10 rounded-full blur-2xl animate-spin-slow" />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 relative">
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

        {/* Privacy Section */}
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

        {/* CTA Section */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-6xl font-display font-bold mb-8 max-w-3xl mx-auto">
              Ready to start sharing?
            </h2>
            <Link to="/register">
              <Button size="lg" className="h-16 px-10 rounded-2xl text-xl gradient-primary shadow-xl shadow-primary/25 hover:scale-105 transition-transform duration-300">
                {t('hero.getStarted')}
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
