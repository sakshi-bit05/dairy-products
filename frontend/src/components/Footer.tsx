import { useLanguage } from "@/contexts/LanguageContext";
import { Milk, Phone, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Milk className="h-6 w-6" />
              <h3 className="font-display text-xl font-bold">
                {t("Aditya Dudh Sankalan Kendra", "आदित्य दूध संकलन केंद्र")}
              </h3>
            </div>
            <p className="text-sm opacity-80">
              {t(
                "Quality dairy products from Kalamwadi. Owned by Umesh Suryawanshi.",
                "काळमवाडी येथून दर्जेदार दुग्धजन्य उत्पादने. मालक: उमेश सूर्यवंशी."
              )}
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              {t("Contact", "संपर्क")}
            </h4>
            <div className="space-y-2 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{t("Kalamwadi, Maharashtra", "काळमवाडी, महाराष्ट्र")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+91 83905 14148</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>umeshsurya4832@gmail.com</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              {t("Quick Links", "द्रुत दुवे")}
            </h4>
            <div className="space-y-2 text-sm opacity-80">
              <Link to="/products" className="block hover:underline">{t("Products", "उत्पादने")}</Link>
              <Link to="/about" className="block hover:underline">{t("About Us", "आमच्याबद्दल")}</Link>
              <Link to="/contact" className="block hover:underline">{t("Contact", "संपर्क")}</Link>
              <Link to="/admin-login" className="block hover:underline font-semibold text-dairy-gold">{t("Admin Login", "अ‍ॅडमिन लॉग इन")}</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-60">
          © 2026 {t("Aditya Dudh Sankalan Kendra Kalamwadi", "आदित्य दूध संकलन केंद्र काळमवाडी")}. {t("All rights reserved.", "सर्व हक्क राखीव.")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
