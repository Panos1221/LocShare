import { motion } from "framer-motion";
import type { PinColor, UserLocation } from "@/lib/locationStore";
import { getColorFromValue } from "@/components/color/AdvancedColorPicker";
import { User, Home, Briefcase, Car, Bike, Footprints, Star, Heart, Plane, Coffee, Music, ShoppingCart, Camera, Anchor, Hash, Baby, Cat, Dog, Gamepad2, GraduationCap, ChefHat, Smile, UserCheck, Users, Accessibility } from "lucide-react";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface MapMarkerProps {
  user: UserLocation;
  isCurrentUser?: boolean;
  distance?: string;
}

// Map icon IDs to Lucide components
const iconMap: Record<string, React.ElementType> = {
  user: User,
  home: Home,
  work: Briefcase,
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
  baby: Baby,
  cat: Cat,
  dog: Dog,
  gamer: Gamepad2,
  student: GraduationCap,
  chef: ChefHat,
  happy: Smile,
  verified: UserCheck,
  group: Users,
  accessibility: Accessibility,
};

export function MapMarker({ user, isCurrentUser, distance }: MapMarkerProps) {
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

      {/* Name and Distance label */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-0.5 whitespace-nowrap"
      >
        <span className="glass rounded-full px-2 py-1 text-xs font-medium shadow-soft">
          {user.name}
        </span>
        {distance && (
          <span className="rounded-full bg-black/50 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
            {distance}
          </span>
        )}
      </motion.div>
    </div>
  );
}

// Function to create HTML element for Mapbox
// Function to create HTML element for Mapbox
export function createMarkerElement(user: UserLocation, isCurrentUser: boolean, distance?: string): HTMLDivElement {
  const color = getColorFromValue(user.color);
  // Render the icon to an SVG string
  const IconComponent = iconMap[user.icon || 'user'] || User;
  const iconSvg = renderToStaticMarkup(<IconComponent size={20} color="white" strokeWidth={2.5} />);

  // Create container - strictly sized to the Pin + Pointer
  const container = document.createElement('div');
  container.style.cssText = `
    display: block;
    width: 48px;
    height: 56px;
    cursor: pointer;
    user-select: none;
  `;

  // We use innerHTML with template literals for performance, injecting the computed color and SVG
  // Using absolute positioning for precise anchoring
  container.innerHTML = `
    <style>
      @keyframes pulse-ring {
        0% { transform: scale(0.8); opacity: 0.8; }
        100% { transform: scale(2); opacity: 0; }
      }
      .marker-pulse-${user.id.replace(/[^a-zA-Z0-9]/g, '')} {
        animation: pulse-ring 2s ease-out infinite;
      }
    </style>
    
    <!-- Pin Wrapper (Aligned to bottom) -->
    <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 56px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end;">
      
      <!-- Pin Head -->
      <div style="position: relative; width: 48px; height: 48px; z-index: 2;">
        ${isCurrentUser ? `
          <div class="marker-pulse-${user.id.replace(/[^a-zA-Z0-9]/g, '')}" style="position: absolute; inset: 0; border-radius: 50%; background: ${color}; opacity: 0.3;"></div>
        ` : ''}
        
        <!-- Main Circle -->
        <div style="position: relative; width: 44px; height: 44px; margin: 2px auto; border-radius: 50%; background: ${color}; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.25);">
          ${iconSvg}
        </div>
      </div>

      <!-- Pointer Triangle -->
      <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid ${color}; margin-top: -2px; z-index: 1; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));"></div>
    </div>
    
    <!-- Name and Distance Label (Absolute, hanging below) -->
    <div style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 2px; margin-top: 4px; white-space: nowrap; pointer-events: none; z-index: 10;">
      <span style="background: rgba(255,255,255,0.95); backdrop-filter: blur(4px); border-radius: 9999px; padding: 4px 12px; font-size: 13px; font-weight: 600; color: #1e293b; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border: 1px solid rgba(0,0,0,0.08);">${user.name}</span>
      ${distance ? `
        <span style="background: rgba(0,0,0,0.75); backdrop-filter: blur(4px); border-radius: 9999px; padding: 2px 8px; font-size: 11px; font-weight: 700; color: white;">${distance}</span>
      ` : ''}
    </div>
  `;

  return container;
}

