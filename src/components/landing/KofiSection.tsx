import { motion } from "framer-motion";
import { Coffee, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export const KofiSection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center glass rounded-3xl p-12 border border-primary/20 bg-gradient-to-b from-background/50 to-primary/5 relative overflow-hidden"
                >
                    {/* Decorative background elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute -top-32 -left-32 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-orange-100 to-yellow-100 flex items-center justify-center mb-8 shadow-lg">
                            <Coffee className="h-10 w-10 text-orange-600" />
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                            {t('kofi.title')}
                        </h2>

                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                            {t('kofi.description')}
                        </p>

                        <a
                            href="https://ko-fi.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <Button
                                size="lg"
                                className="h-14 px-8 rounded-full text-lg bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white border-0 shadow-lg shadow-orange-500/20 hover:scale-105 transition-all duration-300"
                            >
                                <Heart className="mr-2 h-5 w-5 fill-current animate-pulse" />
                                {t('kofi.button')}
                            </Button>
                        </a>

                        <p className="mt-6 text-sm text-muted-foreground/60">
                            {t('kofi.thankYou')}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
