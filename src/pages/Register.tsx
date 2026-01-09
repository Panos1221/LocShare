import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Key, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdvancedColorPicker } from "@/components/color/AdvancedColorPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocationStore, type PinColor } from "@/lib/locationStore";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setSession = useLocationStore((state) => state.setSession);

  const [name, setName] = useState("");
  const [passkey, setPasskey] = useState("");
  const [color, setColor] = useState<PinColor | string>("teal");
  const [icon, setIcon] = useState("user");

  // Check for invite code in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setPasskey(code);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const finalPasskey = passkey.trim() || Math.random().toString(36).slice(2, 8).toUpperCase();
      setSession({
        name: name.trim(),
        passkey: finalPasskey,
        color,
        icon,
      });
      navigate("/map", { state: { isNewSession: true } });
    }
  };

  const isValid = name.trim().length > 0;

  return (
    <div className="min-h-screen bg-background gradient-hero">
      <Header />

      <main className="container mx-auto px-4 pt-24 sm:pt-32 pb-20">
        <div className="mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="mb-6 sm:mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('register.back')}
            </Link>

            <div className="glass rounded-3xl border border-border/50 p-6 sm:p-8 shadow-soft">
              <div className="mb-6 sm:mb-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl gradient-primary"
                >
                  <User className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
                </motion.div>
                <h1 className="mb-2 font-display text-2xl sm:text-3xl font-bold">
                  {t('register.title')}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t('register.subtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {t('register.name')}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('register.namePlaceholder')}
                    className="h-12 rounded-xl border-2 bg-background/50 transition-all focus:border-primary focus:ring-0"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t('register.nameHelper')}
                  </p>
                </div>

                {/* Passkey Input */}
                <div className="space-y-2">
                  <Label htmlFor="passkey" className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    {t('register.passkey')}
                  </Label>
                  <Input
                    id="passkey"
                    type="text"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder={t('register.passkeyPlaceholder')}
                    className="h-12 rounded-xl border-2 bg-background/50 transition-all focus:border-primary focus:ring-0"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t('register.passkeyHelper')}
                  </p>
                </div>

                {/* Color Picker */}
                <div className="space-y-3">
                  <AdvancedColorPicker
                    color={color}
                    icon={icon}
                    onColorChange={setColor}
                    onIconChange={setIcon}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t('register.colorHelper')}
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isValid}
                  className="group h-12 sm:h-14 w-full gap-2 rounded-xl text-base sm:text-lg gradient-primary border-0 text-primary-foreground shadow-glow transition-all hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
                >
                  {t('register.submit')}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
