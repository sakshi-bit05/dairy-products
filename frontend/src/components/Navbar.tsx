import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Milk } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("Home", "मुख्यपृष्ठ") },
    { to: "/products", label: t("Products", "उत्पादने") },
    { to: "/about", label: t("About", "आमच्याबद्दल") },
    { to: "/contact", label: t("Contact", "संपर्क") },
    { to: "/admin", label: t("Admin", "अ‍ॅडमिन") },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Milk className="h-7 w-7 text-primary" />
          <span className="font-display text-lg font-bold text-primary hidden sm:inline">
            {t("Aditya Dudh Kendra", "आदित्य दूध केंद्र")}
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(l.to)
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Language toggle + mobile menu */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLang(lang === "en" ? "mr" : "en")}
            className="text-xs font-semibold"
          >
            {lang === "en" ? "मराठी" : "EN"}
          </Button>
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-card pb-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium ${
                isActive(l.to) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
