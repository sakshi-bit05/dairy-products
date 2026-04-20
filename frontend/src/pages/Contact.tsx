import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("Message sent successfully!", "संदेश यशस्वीपणे पाठवला!"));
    setForm({ name: "", email: "", message: "" });
  };

  const info = [
    { icon: MapPin, label: t("Address", "पत्ता"), value: t("Kalamwadi, Maharashtra, India", "काळमवाडी, महाराष्ट्र, भारत") },
    { icon: Phone, label: t("Phone", "फोन"), value: "+91 83905 14148" },
    { icon: Mail, label: t("Email", "ईमेल"), value: "umeshsurya4832@gmail.com" },
    { icon: Clock, label: t("Hours", "वेळ"), value: t("Mon-Sat: 6AM - 8PM", "सोम-शनि: सकाळी ६ - रात्री ८") },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-center mb-12 text-foreground animate-fade-in">
        {t("Contact Us", "आमच्याशी संपर्क साधा")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Info */}
        <div className="space-y-6">
          {info.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <div className="bg-primary/10 p-3 rounded-lg hover-scale">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{item.label}</h3>
                <p className="text-muted-foreground text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
          <Input
            placeholder={t("Your Name", "तुमचे नाव")}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder={t("Your Email", "तुमचा ईमेल")}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Textarea
            placeholder={t("Your Message", "तुमचा संदेश")}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={5}
            required
          />
          <Button type="submit" className="w-full hover-scale">
            {t("Send Message", "संदेश पाठवा")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
