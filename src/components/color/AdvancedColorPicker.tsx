import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Palette, Car, Home, Briefcase, User, Star, Heart, Footprints, Bike, Plane, Coffee, Music, ShoppingCart, Camera, Anchor } from "lucide-react"; // More icons
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PinColor } from "@/lib/locationStore";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface ColorPickerProps {
    color: PinColor | string;
    icon?: string;
    onColorChange: (color: PinColor | string) => void;
    onIconChange: (icon: string) => void;
}

const presetColors: { id: PinColor; value: string }[] = [
    { id: 'red', value: '#ef4444' }, // approximate tailwind colors
    { id: 'orange', value: '#f97316' },
    { id: 'yellow', value: '#eab308' },
    { id: 'green', value: '#22c55e' },
    { id: 'teal', value: '#14b8a6' },
    { id: 'blue', value: '#3b82f6' },
    { id: 'purple', value: '#a855f7' },
    { id: 'pink', value: '#ec4899' },
];

const icons = [
    { id: 'user', icon: User, label: 'User' },
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'work', icon: Briefcase, label: 'Work' },
    { id: 'car', icon: Car, label: 'Car' },
    { id: 'bike', icon: Bike, label: 'Bike' },
    { id: 'walk', icon: Footprints, label: 'Walk' },
    { id: 'star', icon: Star, label: 'Star' },
    { id: 'heart', icon: Heart, label: 'Heart' },
    { id: 'plane', icon: Plane, label: 'Travel' },
    { id: 'coffee', icon: Coffee, label: 'Coffee' },
    { id: 'music', icon: Music, label: 'Music' },
    { id: 'shop', icon: ShoppingCart, label: 'Shop' },
    { id: 'camera', icon: Camera, label: 'Photo' },
    { id: 'anchor', icon: Anchor, label: 'Anchor' },
];

export function AdvancedColorPicker({ color, icon = 'user', onColorChange, onIconChange }: ColorPickerProps) {
    const [customColor, setCustomColor] = useState(color.startsWith('#') ? color : '#3b82f6');
    const [isCustom, setIsCustom] = useState(color.startsWith('#') || color.startsWith('hsl'));
    const [isOpen, setIsOpen] = useState(false);

    // Helper to determine if current selection matches a preset
    const isPreset = (id: string) => !isCustom && color === id;

    const handlePresetClick = (id: string) => {
        setIsCustom(false);
        onColorChange(id);
    };

    const handleCustomChange = (newColor: string) => {
        setCustomColor(newColor);
        setIsCustom(true);
        onColorChange(newColor);
    };

    return (
        <div className="space-y-6">

            {/* Color Section */}
            <div className="space-y-3">
                <Label className="text-base font-medium">Marker Color</Label>
                <div className="flex flex-wrap gap-3">
                    {presetColors.map((preset) => (
                        <motion.button
                            key={preset.id}
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePresetClick(preset.id)}
                            className={cn(
                                "relative h-10 w-10 rounded-full transition-all",
                                isPreset(preset.id) && "ring-2 ring-offset-2 ring-offset-background ring-primary"
                            )}
                            style={{ backgroundColor: preset.value }}
                        >
                            {isPreset(preset.id) && (
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

                    {/* Custom Color Trigger */}
                    <Popover open={isOpen} onOpenChange={setIsOpen}>
                        <PopoverTrigger asChild>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "relative h-10 w-10 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center transition-all",
                                    isCustom && "ring-2 ring-offset-2 ring-offset-background ring-primary border-transparent"
                                )}
                                style={isCustom ? { backgroundColor: customColor } : {}}
                            >
                                {isCustom ? (
                                    <Check className="h-5 w-5 text-white drop-shadow-md" />
                                ) : (
                                    <Palette className="h-5 w-5 text-muted-foreground" />
                                )}
                            </motion.button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-4" align="start">
                            <div className="space-y-3">
                                <Label>Custom Color</Label>
                                <HexColorPicker color={customColor} onChange={handleCustomChange} />
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full border border-border" style={{ backgroundColor: customColor }} />
                                    <Input
                                        value={customColor}
                                        onChange={(e) => handleCustomChange(e.target.value)}
                                        className="flex-1 font-mono uppercase"
                                        maxLength={7}
                                    />
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Icon Section */}
            <div className="space-y-3">
                <Label className="text-base font-medium">Marker Icon</Label>
                <div className="grid grid-cols-7 gap-2">
                    {icons.map(({ id, icon: Icon }) => (
                        <motion.button
                            key={id}
                            type="button"
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onIconChange(id)}
                            className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                                icon === id ? "bg-primary text-primary-foreground shadow-soft" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                            )}
                            title={id}
                        >
                            <Icon className="h-5 w-5" />
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Helper to reliably get a CSS color string from any value (preset name, hex, hsl)
export function getColorFromValue(value: PinColor | string): string {
    const presetMap: Record<string, string> = {
        red: '#ef4444',
        orange: '#f97316',
        yellow: '#eab308',
        green: '#22c55e',
        teal: '#14b8a6',
        blue: '#3b82f6',
        purple: '#a855f7',
        pink: '#ec4899',
    };

    if (value in presetMap) {
        return presetMap[value];
    }

    // Return as is if it looks like a color string
    if (value.startsWith('#') || value.startsWith('hsl') || value.startsWith('rgb')) {
        return value;
    }

    // Legacy fallback for old HSL space-separated strings (if any exist in local storage)
    // "200 80% 50%" -> "hsl(200, 80%, 50%)"
    const parts = value.split(' ');
    if (parts.length === 3) {
        return `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})`;
    }

    return presetMap.teal;
}
