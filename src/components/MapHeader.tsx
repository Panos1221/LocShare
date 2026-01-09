import { motion } from "framer-motion";
import { LogOut, MapPin, Wifi, WifiOff, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { MapSettings } from "./MapSettings";
import { cn } from "@/lib/utils";

interface MapHeaderProps {
  isConnected: boolean;
  currentMapStyle: string;
  onMapStyleChange: (style: string) => void;
  onLeave: () => void;
}

export function MapHeader({
  isConnected,
  currentMapStyle,
  onMapStyleChange,
  onLeave
}: MapHeaderProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute left-0 right-0 top-4 z-40 flex justify-center pointer-events-none"
    >
      <div className="glass pointer-events-auto mx-4 flex items-center justify-between gap-4 rounded-full border border-border/50 px-2 py-2 shadow-soft backdrop-blur-md sm:gap-6 sm:px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary shadow-lg">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-lg font-bold leading-tight">
              {t('map.title')}
            </h1>
            <div className="flex items-center gap-1.5">
              {isConnected ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-green-500 font-bold">{t('map.connected')}</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 text-destructive" />
                  <span className="text-xs text-destructive">{t('map.disconnected')}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Map Settings */}
          <MapSettings
            currentStyle={currentMapStyle}
            onStyleChange={onMapStyleChange}
          />

          <div className="h-8 w-[1px] bg-border/50" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Leave Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onLeave}
            className="h-10 w-10 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
            title={t('map.leave')}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
