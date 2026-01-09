import { Code, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">LocShare</span>
          </div>

          <p className="flex items-center gap-1 text-sm text-muted-foreground group">
            <Code className="h-4 w-4 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
            {t('footer.madeBy')}{' '}
            <a
              href="https://github.com/Panos1221"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Panos1221
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
