import { motion } from "framer-motion";
import type { PinColor, UserLocation } from "@/lib/locationStore";
import { getColorFromValue } from "@/components/color/AdvancedColorPicker";
import { User, Home, Briefcase, Car, Bike, Footprints, Star, Heart, Plane, Coffee, Music, ShoppingCart, Camera, Anchor, Hash } from "lucide-react";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface MapMarkerProps {
  user: UserLocation;
  isCurrentUser?: boolean;
}

// Map icon IDs to Lucide components
const iconMap: Record<string, React.ElementType> = {
  user: User,
  home: Home,
  work: Briefcase, // mapped "work" to Briefcase
  car: Car,
  bike: Bike,
  walk: Footprints,
  star: Star,
  heart: Heart,
  plane: Plane,
  coffee: Coffee,
  music: Music,
  shop: ShoppingCart,
  camera: Camera,
  anchor: Anchor,
};

export function MapMarker({ user, isCurrentUser }: MapMarkerProps) {
  const color = getColorFromValue(user.color);
  const IconComponent = iconMap[user.icon || 'user'] || User;

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse effect for current user */}
      {isCurrentUser && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute h-12 w-12 rounded-full"
          style={{ backgroundColor: color, opacity: 0.3 }}
        />
      )}

      {/* Main marker */}
      <motion.div
        initial={{ scale: 0, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg border-2 border-white"
        style={{ backgroundColor: color }}
      >
        <IconComponent className="h-6 w-6 text-white drop-shadow-md" />

        {/* Bottom pointer */}
        <div
          className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-white"
          style={{ backgroundColor: color }}
        />
      </motion.div>

      {/* Name label */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <span className="glass rounded-full px-2 py-1 text-xs font-medium shadow-soft">
          {user.name}
        </span>
      </motion.div>
    </div>
  );
}

// Function to create HTML element for Mapbox
export function createMarkerElement(user: UserLocation, isCurrentUser: boolean): HTMLDivElement {
  const color = getColorFromValue(user.color);
  // Render the icon to an SVG string
  const IconComponent = iconMap[user.icon || 'user'] || User;
  const iconSvg = renderToStaticMarkup(<IconComponent size={20} color="white" strokeWidth={2.5} />);

  const container = document.createElement('div');
  container.className = 'relative flex items-center justify-center cursor-pointer group';
  container.style.width = '60px';
  container.style.height = '70px';

  // We use innerHTML with template literals for performance, injecting the computed color and SVG
  container.innerHTML = `
    <style>
      @keyframes pulse-ring {
        0% { transform: scale(0.8); opacity: 0.8; }
        100% { transform: scale(2); opacity: 0; }
      }
      .marker-pulse {
        animation: pulse-ring 2s ease-out infinite;
      }
    </style>
    ${isCurrentUser ? `
      <div class="marker-pulse absolute" style="width: 48px; height: 48px; border-radius: 50%; background: ${color}; opacity: 0.3;"></div>
    ` : ''}
    
    <!-- Outer Ring / Border -->
    <div style="position: absolute; width: 52px; height: 52px; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.2);"></div>

    <!-- Main Circle -->
    <div style="position: relative; width: 48px; height: 48px; border-radius: 50%; background: ${color}; display: flex; align-items: center; justify-content: center; z-index: 2;">
      ${iconSvg}
      <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 14px; height: 14px; background: ${color}; border-right: 2px solid white; border-bottom: 2px solid white; z-index: -1;"></div>
    </div>
    
    <!-- Label -->
    <div style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); white-space: nowrap; z-index: 10; opacity: 1; transition: opacity 0.2s;">
      <span style="background: rgba(255,255,255,0.95); backdrop-filter: blur(4px); border-radius: 9999px; padding: 2px 8px; font-size: 11px; font-weight: 600; color: #1e293b; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.05);">${user.name}</span>
    </div>
  `;

  return container;
}
