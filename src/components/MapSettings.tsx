import { useState } from "react";
import { Settings, Layers, X, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"; // Keep for internal animations if needed, or remove if Popover animation is sufficient. Popover has built-in animation.
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { mapStyles } from "@/lib/mapStyles";

interface MapSettingsProps {
  currentStyle: string;
  onStyleChange: (styleId: string) => void;
}

export function MapSettings({ currentStyle, onStyleChange }: MapSettingsProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleStyleChange = (styleId: string) => {
    onStyleChange(styleId);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">{t('map.mapStyle')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 border-none bg-transparent shadow-none"
        sideOffset={8}
        align="end"
      >
        <div className="glass rounded-2xl border border-border/50 p-4 shadow-soft bg-background/95">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <span className="font-display font-medium text-sm">{t('map.mapStyle')}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Style Options */}
          <div className="grid grid-cols-3 gap-2">
            {mapStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => handleStyleChange(style.id)}
                className={cn(
                  "relative flex flex-col items-center gap-1 rounded-xl p-3 transition-all hover:scale-105 active:scale-95",
                  currentStyle === style.id
                    ? "bg-primary/10 ring-2 ring-primary"
                    : "bg-muted/50 hover:bg-muted"
                )}
              >
                <span className="text-2xl">{style.icon}</span>
                <span className="text-xs font-medium">{style.name}</span>
                {currentStyle === style.id && (
                  <div
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary"
                  >
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}


