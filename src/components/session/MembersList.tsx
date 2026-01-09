import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronUp, ChevronDown, Navigation, MoreVertical, Copy, Crosshair, Map as MapIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import type { UserLocation } from "@/lib/locationStore";
import { useLocationStore } from "@/lib/locationStore";
import { getColorFromValue } from "@/components/color/CustomColorPicker";
import { cn } from "@/lib/utils";
import { calculateDistance, getGoogleMapsUrl, getAppleMapsUrl, getWazeUrl, reverseGeocode } from "@/lib/geoUtils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { socket } from "@/lib/socketClient";

interface MembersListProps {
  members: UserLocation[];
  onMemberClick: (member: UserLocation) => void;
  currentLocation: GeolocationPosition | null;
}

export function MembersList({ members, onMemberClick, currentLocation }: MembersListProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const { isConnected } = useLocationStore();

  // Sort members: Current user first, then by name
  // We use socket.id to identify the current user reliably
  const sortedMembers = [...members].sort((a, b) => {
    const isASelf = a.id === socket.id || a.id === 'self' || a.id === 'current-user';
    const isBSelf = b.id === socket.id || b.id === 'self' || b.id === 'current-user';

    if (isASelf && !isBSelf) return -1;
    if (!isASelf && isBSelf) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      {/* Desktop View */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="hidden md:block"
      >
        <div className="glass rounded-2xl border border-white/20 bg-background/20 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-300">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <span className="font-display font-bold text-sm block leading-none">
                  {t('map.members')}
                </span>
                <span className="text-xs text-muted-foreground">
                  {members.length} {t('common.active', { defaultValue: 'active' })}
                </span>
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden scrollbar-thin p-2 space-y-1">
                  {sortedMembers.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      currentLocation={currentLocation}
                      onClick={() => onMemberClick(member)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile View - Bottom Sheet Style */}
      <div className="md:hidden fixed inset-0 z-40 pointer-events-none">
        {/* Backdrop for clicking outside */}
        <AnimatePresence>
          {isMobileExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileExpanded(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            />
          )}
        </AnimatePresence>

        <motion.div
          initial={false}
          animate={{ y: isMobileExpanded ? 0 : "calc(100% - 65px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          onDragEnd={(_, info) => {
            if (info.offset.y < -50 || info.velocity.y < -500) setIsMobileExpanded(true);
            if (info.offset.y > 50 || info.velocity.y > 500) setIsMobileExpanded(false);
          }}
          className={cn(
            "absolute bottom-0 left-0 right-0 pointer-events-auto backdrop-blur-xl border-t border-white/20 shadow-2xl rounded-t-3xl overflow-hidden transition-colors duration-300",
            isMobileExpanded ? "bg-background" : "bg-background/80"
          )}
        >
          {/* Handle */}
          <div
            className="w-full flex items-center justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
          >
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
          </div>

          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm">{t('map.members')}</h3>
                  <p className="text-xs text-muted-foreground">{members.length} active</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileExpanded(!isMobileExpanded)}
                className="h-8 w-8 p-0 rounded-full"
              >
                {isMobileExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </div>

            <div className="max-h-[92vh] overflow-y-auto scrollbar-hide space-y-2 pb-8">
              {sortedMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  currentLocation={currentLocation}
                  onClick={() => {
                    onMemberClick(member);
                    setIsMobileExpanded(false);
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function MemberCard({
  member,
  onClick,
  currentLocation
}: {
  member: UserLocation;
  onClick: () => void;
  currentLocation: GeolocationPosition | null;
}) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { mapboxToken } = useLocationStore();
  const [address, setAddress] = useState<{ display: string, full: string } | null>(null);
  const [imageError, setImageError] = useState(false);

  const colorStyle = getColorFromValue(member.color);
  // Robust self-check
  const isSelf = member.id === socket.id || member.id === 'self' || member.id === 'current-user';

  // Calculate generic status based on last update time
  const lastUpdate = new Date(member.lastUpdated).getTime();
  const now = Date.now();
  const diffMinutes = (now - lastUpdate) / 1000 / 60;

  let statusColor = "bg-green-500";
  let statusText = "Online";

  // If it's self, we're always online
  if (!isSelf) {
    if (diffMinutes > 30) {
      statusColor = "bg-gray-400";
      statusText = "Offline";
    } else if (diffMinutes > 5) {
      statusColor = "bg-yellow-500";
      statusText = "Away";
    }
  }

  const distance = currentLocation && !isSelf
    ? calculateDistance(
      currentLocation.coords.latitude,
      currentLocation.coords.longitude,
      member.latitude,
      member.longitude
    )
    : null;

  useEffect(() => {
    let isMounted = true;
    if (mapboxToken) {
      reverseGeocode(member.latitude, member.longitude, mapboxToken).then(res => {
        if (isMounted) setAddress(res);
      });
    }
    return () => { isMounted = false; };
  }, [member.latitude, member.longitude, mapboxToken]);

  const handleCopyCoords = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${member.latitude}, ${member.longitude}`);
    toast({
      description: <span className="text-[11px] sm:text-sm">Coordinates copied to clipboard</span>,
    });
  };

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (address) {
      navigator.clipboard.writeText(address.full);
      toast({
        description: <span className="text-[11px] sm:text-sm">Full address copied to clipboard</span>,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border",
        isSelf
          ? "bg-primary/10 border-primary/20 hover:bg-primary/15"
          : "border-transparent hover:bg-white/5 hover:border-white/10"
      )}
    >
      {/* Avatar Section */}
      <div className="relative self-start mt-0.5">
        <div
          className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center shadow-sm text-white overflow-hidden ring-2 ring-background ring-offset-1 ring-offset-transparent bg-cover bg-center"
          style={{ backgroundColor: colorStyle }}
          onClick={onClick}
        >
          {member.icon && !imageError ? (
            <img
              src={member.icon}
              alt={member.name}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-sm font-bold select-none">
              {member.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        {/* Status indicator */}
        <div className={cn("absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background shadow-sm", statusColor)} title={statusText} />
      </div>

      {/* Info Section */}
      <div className="flex-1 min-w-0 cursor-pointer flex flex-col gap-0.5 justify-center py-0.5" onClick={onClick}>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm truncate leading-tight text-foreground">
            {member.name}
          </p>
          {isSelf && (
            <span className="text-[10px] uppercase tracking-wider font-bold text-primary-foreground bg-primary px-1.5 py-0.5 rounded-full shadow-sm">
              {t('map.you')}
            </span>
          )}
        </div>

        {/* Location Name - Fully Visible */}
        <div className="flex items-start gap-1 text-xs text-muted-foreground w-full">
          <MapIcon className="h-3 w-3 shrink-0 mt-0.5" />
          <span className="leading-tight break-words whitespace-normal">
            {address ? address.display : `${member.latitude.toFixed(4)}, ${member.longitude.toFixed(4)}`}
          </span>
        </div>

        {/* Distance */}
        {distance && !isSelf && (
          <div className="flex items-center gap-1 text-xs font-medium text-primary mt-0.5">
            <Navigation className="h-3 w-3 shrink-0" />
            <span>{distance} away</span>
          </div>
        )}
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-1 self-center">
        {!isSelf && (
          <>
            {/* Dedicated Navigation Button with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-blue-500/20 hover:text-blue-500 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Navigation className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => window.open(getGoogleMapsUrl(member.latitude, member.longitude), '_blank')}>
                  Google Maps
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open(getAppleMapsUrl(member.latitude, member.longitude), '_blank')}>
                  Apple Maps
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open(getWazeUrl(member.latitude, member.longitude), '_blank')}>
                  Waze
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* More Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-background/40">
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleCopyCoords}>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Copy Coordinates</span>
                </DropdownMenuItem>
                {address && (
                  <DropdownMenuItem onClick={handleCopyAddress}>
                    <MapIcon className="mr-2 h-4 w-4" />
                    <span>Copy Address</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        {isSelf && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onClick}
            title="Center on me"
          >
            <Crosshair className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}