import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Palette, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PinColor } from "@/lib/locationStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface CustomColorPickerProps {
  value: PinColor | string;
  onChange: (color: PinColor | string) => void;
}

const presetColors: { id: PinColor; hsl: string }[] = [
  { id: 'red', hsl: '0 80% 55%' },
  { id: 'orange', hsl: '25 95% 55%' },
  { id: 'yellow', hsl: '45 95% 50%' },
  { id: 'green', hsl: '142 70% 45%' },
  { id: 'teal', hsl: '174 72% 40%' },
  { id: 'blue', hsl: '210 90% 55%' },
  { id: 'purple', hsl: '270 70% 60%' },
  { id: 'pink', hsl: '330 80% 60%' },
];

export function CustomColorPicker({ value, onChange }: CustomColorPickerProps) {
  const [customHue, setCustomHue] = useState(200);
  const [customSat, setCustomSat] = useState(80);
  const [customLight, setCustomLight] = useState(50);
  const [isCustom, setIsCustom] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  const isPresetColor = presetColors.some(c => c.id === value);
  const customHslString = `${customHue} ${customSat}% ${customLight}%`;
  const customColorStyle = `hsl(${customHue}, ${customSat}%, ${customLight}%)`;

  const handlePresetClick = (color: PinColor) => {
    setIsCustom(false);
    onChange(color);
  };

  const handleCustomConfirm = () => {
    setIsCustom(true);
    onChange(customHslString);
    setCustomOpen(false);
  };

  const getColorStyle = (color: PinColor | string) => {
    if (presetColors.some(c => c.id === color)) {
      return { backgroundColor: `hsl(var(--pin-${color}))` };
    }
    // It's a custom HSL string
    const parts = color.split(' ');
    if (parts.length === 3) {
      return { backgroundColor: `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})` };
    }
    return {};
  };

  return (
    <div className="space-y-4">
      {/* Preset Colors */}
      <div className="flex flex-wrap gap-3">
        {presetColors.map((color) => (
          <motion.button
            key={color.id}
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePresetClick(color.id)}
            className={cn(
              "relative h-10 w-10 rounded-full transition-all duration-200",
              value === color.id && !isCustom && "ring-2 ring-offset-2 ring-offset-background"
            )}
            style={{ 
              backgroundColor: `hsl(var(--pin-${color.id}))`,
              ...(value === color.id && !isCustom ? { boxShadow: `0 0 0 2px hsl(var(--pin-${color.id}))` } : {})
            }}
          >
            {value === color.id && !isCustom && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Check className="h-5 w-5 text-white drop-shadow-md" />
              </motion.div>
            )}
          </motion.button>
        ))}

        {/* Custom Color Button */}
        <Popover open={customOpen} onOpenChange={setCustomOpen}>
          <PopoverTrigger asChild>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative h-10 w-10 rounded-full border-2 border-dashed border-muted-foreground/50 transition-all duration-200 flex items-center justify-center",
                isCustom && "ring-2 ring-offset-2 ring-offset-background"
              )}
              style={isCustom ? getColorStyle(value) : {}}
            >
              {isCustom ? (
                <Check className="h-5 w-5 text-white drop-shadow-md" />
              ) : (
                <Plus className="h-5 w-5 text-muted-foreground" />
              )}
            </motion.button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4 bg-popover border border-border z-50" side="top">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <span className="font-semibold">Custom Color</span>
              </div>

              {/* Color Preview */}
              <div 
                className="h-16 w-full rounded-xl shadow-inner transition-colors duration-200"
                style={{ backgroundColor: customColorStyle }}
              />

              {/* Hue Slider */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Hue</Label>
                <div 
                  className="h-3 rounded-full"
                  style={{
                    background: 'linear-gradient(to right, hsl(0, 80%, 50%), hsl(60, 80%, 50%), hsl(120, 80%, 50%), hsl(180, 80%, 50%), hsl(240, 80%, 50%), hsl(300, 80%, 50%), hsl(360, 80%, 50%))'
                  }}
                />
                <Slider
                  value={[customHue]}
                  onValueChange={([val]) => setCustomHue(val)}
                  min={0}
                  max={360}
                  step={1}
                  className="mt-1"
                />
              </div>

              {/* Saturation Slider */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Saturation</Label>
                <div 
                  className="h-3 rounded-full"
                  style={{
                    background: `linear-gradient(to right, hsl(${customHue}, 0%, ${customLight}%), hsl(${customHue}, 100%, ${customLight}%))`
                  }}
                />
                <Slider
                  value={[customSat]}
                  onValueChange={([val]) => setCustomSat(val)}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-1"
                />
              </div>

              {/* Lightness Slider */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Lightness</Label>
                <div 
                  className="h-3 rounded-full"
                  style={{
                    background: `linear-gradient(to right, hsl(${customHue}, ${customSat}%, 10%), hsl(${customHue}, ${customSat}%, 50%), hsl(${customHue}, ${customSat}%, 90%))`
                  }}
                />
                <Slider
                  value={[customLight]}
                  onValueChange={([val]) => setCustomLight(val)}
                  min={20}
                  max={80}
                  step={1}
                  className="mt-1"
                />
              </div>

              {/* HSL Value Display */}
              <Input 
                value={`hsl(${customHue}, ${customSat}%, ${customLight}%)`}
                readOnly
                className="text-xs font-mono"
              />

              <Button 
                onClick={handleCustomConfirm}
                className="w-full gradient-primary text-primary-foreground border-0"
              >
                Use This Color
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

// Helper function to get the actual color from a PinColor or custom HSL
export function getColorFromValue(value: PinColor | string): string {
  const presetMap: Record<PinColor, string> = {
    red: 'hsl(0, 80%, 55%)',
    orange: 'hsl(25, 95%, 55%)',
    yellow: 'hsl(45, 95%, 50%)',
    green: 'hsl(142, 70%, 45%)',
    teal: 'hsl(174, 72%, 40%)',
    blue: 'hsl(210, 90%, 55%)',
    purple: 'hsl(270, 70%, 60%)',
    pink: 'hsl(330, 80%, 60%)',
  };
  
  if (value in presetMap) {
    return presetMap[value as PinColor];
  }
  
  // Parse custom HSL string
  const parts = value.split(' ');
  if (parts.length === 3) {
    return `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})`;
  }
  
  return presetMap.teal;
}
