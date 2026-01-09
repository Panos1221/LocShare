import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Copy, X, Share2, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface ShareSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    passkey: string;
}

export function ShareSessionModal({ isOpen, onClose, passkey }: ShareSessionModalProps) {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    // Generate the full invite link
    // Assuming the app is hosted at the current origin
    const origin = window.location.origin;
    const inviteLink = `${origin}/register?code=${encodeURIComponent(passkey)}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: t('share.title'),
                    text: t('share.subtitle'),
                    url: inviteLink,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="glass relative w-full max-w-sm overflow-hidden rounded-3xl border border-border/50 p-6 shadow-2xl"
                    >
                        {/* Close Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="absolute right-4 top-4 h-8 w-8 rounded-full hover:bg-muted"
                        >
                            <X className="h-4 w-4" />
                        </Button>

                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-lg">
                                <Share2 className="h-6 w-6 text-primary-foreground" />
                            </div>

                            <h2 className="mb-2 text-2xl font-bold font-display">{t('share.title')}</h2>
                            <p className="mb-6 text-sm text-muted-foreground">
                                {t('share.subtitle')}
                            </p>

                            {/* QR Code Container */}
                            <div className="mb-6 rounded-2xl bg-white p-4 shadow-inner">
                                <QRCodeSVG
                                    value={inviteLink}
                                    size={180}
                                    level="H"
                                    includeMargin={true}
                                    className="mx-auto"
                                />
                            </div>

                            {/* Passkey Display */}
                            <div className="mb-6 w-full rounded-xl bg-muted/50 p-3">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                    {t('share.passkey')}
                                </p>
                                <p className="font-mono text-xl font-bold tracking-widest">{passkey}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex w-full gap-3">
                                <Button
                                    onClick={handleCopy}
                                    className="flex-1 gap-2 rounded-xl h-12"
                                    variant={copied ? "default" : "outline"}
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    {copied ? t('share.copied') : t('share.copyLink')}
                                </Button>

                                {/* Native Share Button (Mobile) */}
                                {navigator.share && (
                                    <Button
                                        onClick={handleShare}
                                        variant="outline"
                                        className="h-12 w-12 rounded-xl p-0"
                                        title={t('share.shareVia')}
                                    >
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
