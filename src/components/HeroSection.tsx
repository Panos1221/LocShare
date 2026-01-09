import { motion } from "framer-motion";
import { ArrowRight, MapPin, Shield, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen overflow-hidden gradient-hero pt-32 pb-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className="absolute -top-1/2 -right-1/2 h-[800px] w-[800px] rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-1/2 -left-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              {t('footer.privacy')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          >
            {t('hero.title')}{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t('hero.subtitle')}
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute bottom-2 left-0 -z-10 h-3 w-full origin-left bg-primary/20"
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/register">
              <Button size="lg" className="group h-14 gap-2 rounded-full px-8 text-lg gradient-primary border-0 text-primary-foreground shadow-glow hover:shadow-lg transition-all">
                {t('hero.getStarted')}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="h-14 rounded-full px-8 text-lg border-2 hover:bg-accent">
                {t('hero.learnMore')}
              </Button>
            </a>
          </motion.div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            <FloatingCard
              icon={<MapPin className="h-6 w-6" />}
              title="Real-time"
              delay={0}
            />
            <FloatingCard
              icon={<Users className="h-6 w-6" />}
              title="Group Sharing"
              delay={0.1}
            />
            <FloatingCard
              icon={<Shield className="h-6 w-6" />}
              title="Privacy First"
              delay={0.2}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({ icon, title, delay }: { icon: React.ReactNode; title: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 + delay }}
      className="animate-float glass rounded-2xl border border-border/50 p-6 shadow-soft"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <h3 className="font-display font-semibold">{title}</h3>
    </motion.div>
  );
}
