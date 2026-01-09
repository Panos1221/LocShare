import { Minus, Plus, Crosshair, Compass, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface MapControlsProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onLocateMe: () => void;
    onResetBearing: () => void;
    onStopSharing: () => void;
    bearing: number;
    isSharing: boolean;
}

export function MapControls({ onZoomIn, onZoomOut, onLocateMe, onResetBearing, onStopSharing, bearing, isSharing }: MapControlsProps) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-2">
            {/* Compass / Reset Bearing */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: bearing !== 0 ? 1 : 0 }}
            >
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onResetBearing}
                    className="h-10 w-10 rounded-full border border-border/50 bg-background/80 shadow-soft backdrop-blur-sm transition-transform hover:scale-105"
                    title={t('map.resetBearing')}
                >
                    <Compass className="h-5 w-5 text-primary" style={{ transform: `rotate(${-(bearing || 0)}deg)` }} />
                </Button>
            </motion.div>

            {/* Stop Sharing */}
            {/* Share Toggle */}
            <Button
                variant="outline"
                size="icon"
                onClick={onStopSharing}
                className={`h-10 w-10 rounded-full border bg-background/80 shadow-soft backdrop-blur-sm transition-transform hover:scale-105 ${isSharing
                    ? "border-red-500/20 hover:bg-red-500/10 hover:border-red-500/50"
                    : "border-green-500/20 hover:bg-green-500/10 hover:border-green-500/50"
                    }`}
                title={isSharing ? t('map.stopSharing') : t('map.startSharing')}
            >
                {isSharing ? (
                    <EyeOff className="h-5 w-5 text-red-500" />
                ) : (
                    <Eye className="h-5 w-5 text-green-500" />
                )}
            </Button>

            {/* Locate Me */}
            <Button
                variant="outline"
                size="icon"
                onClick={onLocateMe}
                className="h-10 w-10 rounded-full border border-border/50 bg-background/80 shadow-soft backdrop-blur-sm transition-transform hover:scale-105"
                title={t('map.locateMe')}
            >
                <Crosshair className="h-5 w-5 text-primary" />
            </Button>

            {/* Zoom Controls Group */}
            <div className="flex flex-col rounded-3xl border border-border/50 bg-background/80 shadow-soft backdrop-blur-sm">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onZoomIn}
                    className="h-10 w-10 rounded-t-3xl rounded-b-none hover:bg-background/50"
                    title={t('map.zoomIn')}
                >
                    <Plus className="h-5 w-5" />
                </Button>
                <div className="h-[1px] w-full bg-border/50" />
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onZoomOut}
                    className="h-10 w-10 rounded-b-3xl rounded-t-none hover:bg-background/50"
                    title={t('map.zoomOut')}
                >
                    <Minus className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
