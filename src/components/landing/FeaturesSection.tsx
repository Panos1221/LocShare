import { motion } from "framer-motion";
import { Shield, Smartphone, Battery, Globe, Lock, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const features = [
    {
        icon: Lock,
        titleKey: "features.privacy.title",
        descKey: "features.privacy.description",
    },
    {
        icon: Smartphone,
        titleKey: "features.device.title",
        descKey: "features.device.description",
    },
    {
        icon: Battery,
        titleKey: "features.battery.title",
        descKey: "features.battery.description",
    },
    {
        icon: Globe,
        titleKey: "features.global.title",
        descKey: "features.global.description",
    },
    {
        icon: Zap,
        titleKey: "features.speed.title",
        descKey: "features.speed.description",
    },
    {
        icon: Shield,
        titleKey: "features.secure.title",
        descKey: "features.secure.description",
    }
];

export const FeaturesSection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-muted/30 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-5xl font-display font-bold mb-6">
                            {t('features.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            {t('features.subtitle')}
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
                        >
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="h-7 w-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t(feature.titleKey)}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t(feature.descKey)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
