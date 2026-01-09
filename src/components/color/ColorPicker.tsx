import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PinColor } from "@/lib/locationStore";

interface ColorPickerProps {
  value: PinColor;
  onChange: (color: PinColor) => void;
}

const colors: { id: PinColor; class: string; ring: string }[] = [
  { id: 'red', class: 'bg-pin-red', ring: 'ring-pin-red' },
  { id: 'orange', class: 'bg-pin-orange', ring: 'ring-pin-orange' },
  { id: 'yellow', class: 'bg-pin-yellow', ring: 'ring-pin-yellow' },
  { id: 'green', class: 'bg-pin-green', ring: 'ring-pin-green' },
  { id: 'teal', class: 'bg-pin-teal', ring: 'ring-pin-teal' },
  { id: 'blue', class: 'bg-pin-blue', ring: 'ring-pin-blue' },
  { id: 'purple', class: 'bg-pin-purple', ring: 'ring-pin-purple' },
  { id: 'pink', class: 'bg-pin-pink', ring: 'ring-pin-pink' },
];

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <motion.button
          key={color.id}
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(color.id)}
          className={cn(
            "relative h-10 w-10 rounded-full transition-all duration-200",
            color.class,
            value === color.id && `ring-2 ring-offset-2 ring-offset-background ${color.ring}`
          )}
        >
          {value === color.id && (
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
    </div>
  );
}
