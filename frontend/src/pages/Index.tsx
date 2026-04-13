import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts } from "@/contexts/ProductContext";
import heroImg from "@/assets/hero-banner.jpg";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Leaf, Award, Truck } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const { products } = useProducts();
  const featured = products.slice(0, 3);

  const features = [
    { icon: Leaf, title: t("100% Natural", "१००% नैसर्गिक"), desc: t("Pure and fresh dairy from healthy cows", "निरोगी गाईंचे शुद्ध आणि ताजे दुग्धजन्य पदार्थ") },
    { icon: Award, title: t("Premium Quality", "उत्कृष्ट दर्जा"), desc: t("Traditional methods, superior taste", "पारंपारिक पद्धती, उत्तम चव") },
    { icon: Truck, title: t("Fresh Delivery", "ताजी डिलिव्हरी"), desc: t("Daily fresh products at your door", "रोज ताजी उत्पादने तुमच्या दारी") },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <img src={heroImg} alt="Dairy farm" className="absolute inset-0 w-full h-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
              {t("Aditya Dudh Sankalan Kendra", "आदित्य दूध संकलन केंद्र")}
            </h1>
            <p className="font-display text-xl text-dairy-gold mb-2">
              {t("Kalamwadi", "कालमवाडी")}
            </p>
            <p className="text-primary-foreground/80 text-lg mb-2">
              {t("Owner: Umesh Suryawanshi", "मालक: उमेश सूर्यवंशी")}
            </p>
            <p className="text-primary-foreground/70 mb-8 max-w-lg">
              {t(
                "Bringing you the finest dairy products made with love and tradition since generations.",
                "पिढ्यानपिढ्या प्रेमाने आणि परंपरेने बनवलेली सर्वोत्तम दुग्धजन्य उत्पादने तुमच्यासाठी."
              )}
            </p>
            <Link to="/products">
              <Button size="lg" className="text-base px-8 hover-scale">
                {t("View Products", "उत्पादने पहा")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-dairy-green-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="text-center p-6 animate-fade-in hover-scale"
                style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}
              >
                <f.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-2 text-foreground animate-fade-in">
            {t("Featured Products", "वैशिष्ट्यपूर्ण उत्पादने")}
          </h2>
          <p className="text-muted-foreground text-center mb-10 animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
            {t("Our most popular dairy products", "आमची सर्वात लोकप्रिय दुग्धजन्य उत्पादने")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p, i) => (
              <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10 animate-fade-in" style={{ animationDelay: "500ms", animationFillMode: "both" }}>
            <Link to="/products">
              <Button variant="outline" size="lg" className="hover-scale">
                {t("View All Products", "सर्व उत्पादने पहा")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
