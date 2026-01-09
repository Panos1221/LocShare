import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ui/ThemeToggle";
import { LanguageSelector } from "./ui/LanguageSelector";
import { Navigation } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-center pointer-events-none"
    >
      <div className="glass px-6 py-3 rounded-full border border-white/20 shadow-xl shadow-black/5 pointer-events-auto backdrop-blur-xl bg-white/10 dark:bg-black/20 flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Navigation className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            LocShare
          </span>
        </Link>

        {/* Separator */}
        <div className="w-px h-6 bg-border/50" />

        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
