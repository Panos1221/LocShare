import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl sm:text-6xl font-display font-bold mb-8 max-w-3xl mx-auto">
                    Ready to start sharing?
                </h2>
                <Link to="/register">
                    <Button size="lg" className="h-16 px-10 rounded-2xl text-xl gradient-primary shadow-xl shadow-primary/25 hover:scale-105 transition-transform duration-300">
                        {t('hero.getStarted')}
                        <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                </Link>
            </div>
        </section>
    );
};
