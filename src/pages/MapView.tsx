import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapHeader } from "@/components/map/MapHeader";
import { MembersList } from "@/components/session/MembersList";
import { createMarkerElement } from "@/components/map/MapMarker";
import { useLocationStore, type UserLocation } from "@/lib/locationStore";
import { mapStyles } from "@/lib/mapStyles";
import { MapControls } from "@/components/map/MapControls";
import { socket } from "@/lib/socketClient";
import { useToast } from "@/hooks/use-toast";
import { calculateDistance } from "@/lib/geoUtils";


const MapView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const { toast } = useToast();
  const hasZoomedToUserRef = useRef(false);

  const { session, members, isConnected, mapboxToken, setMapboxToken, clearSession, setMembers, setConnected, updateMember, stopSharing, resumeSharing } = useLocationStore();

  const [tokenInput, setTokenInput] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(!mapboxToken);
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
  const [currentStyleId, setCurrentStyleId] = useState('navigation-day-v1');
  const [currentMapStyle, setCurrentMapStyle] = useState(() => {
    const isDark = document.documentElement.classList.contains('dark');
    const style = mapStyles.find(s => s.id === 'navigation-day-v1');
    return isDark ? style?.dark || '' : style?.light || '';
  });
  const [mapBearing, setMapBearing] = useState(0);

  // Redirect if no session
  useEffect(() => {
    if (!session) {
      navigate("/register");
    }
  }, [session, navigate]);

  // Real-time connection via Socket.io
  useEffect(() => {
    if (!session || !mapboxToken) return;

    // Connect socket
    if (!socket.connected) {
      socket.connect();
    }

    const onConnect = () => {
      setConnected(true);
      if (currentLocation) {
        // Join session immediately if we have location? 
        // Or just join without location first.
        const selfUser: UserLocation = {
          id: socket.id || 'self', // Fallback, but socket.id should exist
          name: session.name,
          color: session.color,
          icon: session.icon,
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          lastUpdated: new Date()
        };
        // We might not have id here if we rely on socket.id. 
        // But let's use a consistent ID if possible? 
        // For this demo, let's trust socket.id or unique session ID.
        // Actually, let's generate a random ID for the user if not persistent? 
        // The store doesn't seem to persist user ID. Let's use socket.id.
        // Wait, we need to join FIRST to get socket ID properly? No, on 'connect' event socket.id is ready.
      }
    };

    const onDisconnect = () => {
      setConnected(false);
    };

    const onSessionUpdate = (updatedMembers: UserLocation[]) => {
      // Filter out self if needed, or keep self? 
      // The store seems to treat "self" separately in some logic, but usually members list includes everyone.
      // Let's filter out our own socket ID if we manage "self" separately?
      // The previous logic had "self" in the list.
      // Let's update the store with EVERYONE.
      // But we need to handle "self" ID mapping. 
      // If we use socket.id, we need to know WHICH one is us. 
      // socket.id matches us.
      setMembers(updatedMembers);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('session-update', onSessionUpdate);

    // Initial connection check
    if (socket.connected) {
      onConnect();
    } else {
      // If not connected, connect now
      socket.connect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('session-update', onSessionUpdate);
      // Do not disconnect on unmount in dev if using StrictMode, causes flutter
      // But for clean session management we probably should?
      // Let's keep distinct connections per tab.
      socket.disconnect();
      setConnected(false);
    };
  }, [session, mapboxToken, setConnected, setMembers]);

  // Join session when socket connects or session changes
  useEffect(() => {
    if (!session || !socket.connected) return;

    // Join immediately with available info (or placeholder location)
    const userPayload = {
      id: socket.id, // Socket ID is reliable here
      name: session.name,
      color: session.color,
      icon: session.icon,
      latitude: currentLocation?.coords.latitude || 0,
      longitude: currentLocation?.coords.longitude || 0,
      timestamp: Date.now(),
    };

    console.log('Joining session:', session.passkey, userPayload);
    socket.emit('join-session', {
      sessionId: session.passkey,
      user: userPayload
    });

  }, [session, socket.connected, isConnected]);
  // removed `currentLocation` dependency to avoid re-joining on every move. 
  // Location updates are handled by the separate watcher.

  // Watch Position & Broadcast
  useEffect(() => {
    if (!mapboxToken || !session) return;

    if (!navigator.geolocation) {
      toast({
        title: t('common.error'),
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation(position);

        // Zoom to user location on first position
        if (!hasZoomedToUserRef.current && map.current) {
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 13,
            duration: 2000,
          });
          hasZoomedToUserRef.current = true;
        }

        // Emit location update
        if (socket.connected) {
          socket.emit('update-location', {
            sessionId: session.passkey,
            user: {
              id: socket.id,
              name: session.name,
              color: session.color,
              icon: session.icon,
              latitude: latitude,
              longitude: longitude,
            }
          });
        }
      },
      (error) => {
        console.error("Geolocation error:", error);

        // Only show toast for permanent errors or denied permission
        if (error.code === error.PERMISSION_DENIED) {
          toast({
            title: t('map.error'),
            description: "Location permission denied. Please enable it to share your position.",
            variant: "destructive",
          });
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          // This can be intermittent, so we just log it unless it persists
          console.warn("Position unavailable, retrying...");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [mapboxToken, session, toast, t]);
  // Added socket.connected to dependencies effectively, but actually 
  // since we removed the guard clause, it will run regardless. 
  // But we want it to re-run/emit when socket connects? 
  // The watcher callback closes over 'socket'. socket is an object ref.
  // socket.connected boolean changes. 
  // If we want to emit as soon as we connect, we need to trigger something.
  // The previous 'join-session' now handles the initial join.
  // This watcher handles the *moving*.


  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: currentMapStyle,
      center: [0, 20],
      zoom: 2,
      attributionControl: false,
    });

    // Track bearing changes to update the compass
    map.current.on('rotate', () => {
      setMapBearing(map.current?.getBearing() || 0);
    });

    map.current.on('pitch', () => {
      setMapBearing(map.current?.getBearing() || 0);
    });

    // Also update on move end just to be safe/sync
    map.current.on('moveend', () => {
      setMapBearing(map.current?.getBearing() || 0);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken]);

  // Handle map style changes
  const handleStyleChange = useCallback((styleId: string) => {
    setCurrentStyleId(styleId);
    const style = mapStyles.find(s => s.id === styleId);
    if (style) {
      const isDark = document.documentElement.classList.contains('dark');
      const newUrl = isDark ? style.dark : style.light;
      setCurrentMapStyle(newUrl);
      if (map.current) {
        map.current.setStyle(newUrl);
      }
    }
  }, []);



  // Update markers when members change or current location changes
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers that are no longer in members
    markersRef.current.forEach((marker, id) => {
      if (!members.find((m) => m.id === id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    // Add or update markers
    members.forEach((member) => {
      // Basic sanitization
      if (typeof member.latitude !== 'number' || typeof member.longitude !== 'number' ||
        isNaN(member.latitude) || isNaN(member.longitude)) {
        console.warn(`Invalid coordinates for member ${member.id}:`, member);
        return;
      }

      const existingMarker = markersRef.current.get(member.id);
      const isSelf = member.id === socket.id; // Identify self by socket ID

      // Calculate distance if available and not self
      let distanceStr: string | undefined;
      if (currentLocation && !isSelf && member.id !== 'current-user') {
        distanceStr = calculateDistance(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude,
          member.latitude,
          member.longitude
        );
      }

      if (existingMarker) {
        // Smooth transition using setLngLat is native to Mapbox Marker
        existingMarker.setLngLat([member.longitude, member.latitude]);

        // Update marker content and container styles
        // We recreate the element to get the latest proper styles/structure
        const newEl = createMarkerElement(member, isSelf, distanceStr);
        const el = existingMarker.getElement();

        // Safe Update: Only sync dimensions and critical layout props
        // DO NOT overwrite cssText as it wipes Mapbox's transform: translate(...)
        el.style.width = newEl.style.width;
        el.style.height = newEl.style.height;
        el.style.cursor = newEl.style.cursor;
        // Ensure display is block as per new definition
        el.style.display = newEl.style.display;

        const currentInner = el.innerHTML;
        const newInner = newEl.innerHTML;

        if (currentInner !== newInner) {
          el.innerHTML = newInner;
        }

      } else {
        const el = createMarkerElement(member, isSelf, distanceStr);
        // The marker element is strictly sized to the pin (48x56px).
        // The label hangs absolutely below it.
        // Therefore, 'bottom' anchor correctly aligns the tip of the pin to the location.
        const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([member.longitude, member.latitude])
          .addTo(map.current!);

        // Add click handler to fly to member location using marker's latest position
        el.addEventListener('click', () => {
          const latestPos = marker.getLngLat();
          if (map.current) {
            map.current.flyTo({
              center: latestPos,
              zoom: 15,
              duration: 1500,
            });
          }
        });

        markersRef.current.set(member.id, marker);
      }
    });
  }, [members, currentLocation]);


  // Handle theme changes for map style
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          const style = mapStyles.find(s => s.id === currentStyleId);
          if (style) {
            const newUrl = isDark ? style.dark : style.light;
            if (newUrl !== currentMapStyle) {
              setCurrentMapStyle(newUrl);
              map.current?.setStyle(newUrl);
            }
          }
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [currentStyleId, currentMapStyle]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      setMapboxToken(tokenInput.trim());
      setShowTokenInput(false);
    }
  };

  const handleLeave = () => {
    clearSession();
    navigate("/");
  };

  const flyToMember = (member: UserLocation) => {
    if (map.current) {
      map.current.flyTo({
        center: [member.longitude, member.latitude],
        zoom: 15,
        duration: 1500,
      });
    }
  };

  const handleZoomIn = () => {
    map.current?.zoomIn({ duration: 300 });
  };

  const handleZoomOut = () => {
    map.current?.zoomOut({ duration: 300 });
  };

  const handleLocateMe = () => {
    if (map.current && currentLocation) {
      map.current.flyTo({
        center: [currentLocation.coords.longitude, currentLocation.coords.latitude],
        zoom: 15,
        duration: 1500,
      });
    }
  };

  const handleResetBearing = () => {
    map.current?.easeTo({ bearing: 0, pitch: 0, duration: 1000 });
  };

  if (!session) return null;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Token Input Modal */}
      <AnimatePresence>
        {showTokenInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass w-full max-w-md rounded-3xl border border-border/50 p-6 sm:p-8 shadow-soft"
            >
              <div className="mb-6 flex justify-center">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl gradient-primary">
                  <MapPin className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
                </div>
              </div>
              <h2 className="mb-2 text-center font-display text-xl sm:text-2xl font-bold">
                {t('map.enterToken')}
              </h2>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                {t('map.tokenHelper')}
              </p>
              <form onSubmit={handleTokenSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="token">{t('map.enterToken')}</Label>
                  <Input
                    id="token"
                    type="text"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder={t('map.tokenPlaceholder')}
                    className="mt-2 h-12 rounded-xl border-2"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!tokenInput.trim()}
                  className="h-12 w-full rounded-xl gradient-primary border-0 text-primary-foreground"
                >
                  {t('map.confirm')}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header - Floating Island */}
      <MapHeader
        isConnected={isConnected}
        currentMapStyle={currentStyleId}
        onMapStyleChange={handleStyleChange}
        onLeave={handleLeave}
      />

      {/* Members Panel - Floating Card Left */}
      <div className="absolute top-24 left-4 z-30 max-h-[calc(100vh-140px)] w-64 md:w-72">
        <MembersList
          members={members}
          onMemberClick={flyToMember}
          currentLocation={currentLocation}
        />
      </div>

      {/* Status Bar - Floating Bottom Center */}
      {isConnected && currentLocation && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 transform rounded-full glass border border-border/50 px-4 py-2 shadow-soft"
        >
          <p className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            {t('map.sharingLocation')}
          </p>
        </motion.div>
      )}

      {/* Custom Map Controls - Bottom Right */}
      <div className="absolute bottom-8 right-4 z-30 flex flex-col items-end gap-3 pb-6 sm:bottom-8 sm:right-6">
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onLocateMe={handleLocateMe}
          onResetBearing={handleResetBearing}
          onStopSharing={() => {
            if (isConnected) {
              stopSharing();
              socket.disconnect();
            } else {
              socket.connect();
              resumeSharing();
            }
          }}
          bearing={mapBearing}
          isSharing={isConnected}
        />
      </div>
    </div>
  );
};

export default MapView;
