import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { Navigation, Rocket } from "lucide-react";
import i18n from "@/lib/i18n";

export function Header() {
  return (
    <>
      {/* Top Left - App Name & Logo */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-0 left-0 z-50 p-8 pt-10"
      >
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 shadow-sm border border-primary/20 backdrop-blur-md">
            <Navigation className="w-6 h-6 text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-2xl sm:text-3xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
              LocShare
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60 ml-0.5">
              Group Live Tracker
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Bottom Right - Selectors */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3"
      >
        <div className="glass px-4 py-2 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl bg-white/10 dark:bg-black/40 flex items-center gap-3">
          <LanguageSelector />
          <div className="w-px h-4 bg-border/50" />
          <ThemeToggle />
        </div>
      </motion.div>

      {/* Bottom Left - Get Started Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut", delay: 0.4 }}
        className="fixed bottom-8 left-8 z-50"
      >
        <Link
          to="/register"
          className="glass group flex items-center gap-3 px-6 py-3 rounded-2xl border border-primary/20 hover:border-primary/50 shadow-2xl backdrop-blur-xl bg-primary/10 hover:bg-primary/20 transition-all duration-300"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
            <Rocket className="w-4 h-4 text-primary group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
          </div>
          <span className="font-display font-bold text-sm tracking-tight text-foreground">
            {i18n.t('hero.getStarted')}
          </span>
        </Link>
      </motion.div>
    </>
  );
}
