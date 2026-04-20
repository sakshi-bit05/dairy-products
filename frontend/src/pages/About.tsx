import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Users, TreePine } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-center mb-4 text-foreground animate-fade-in">
        {t("About Us", "आमच्याबद्दल")}
      </h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
        {t(
          "Aditya Dudh Sankalan Kendra Kalamwadi is a trusted name in quality dairy products, run by Umesh Suryawanshi with a passion for purity and tradition.",
          "आदित्य दूध संकलन केंद्र काळमवाडी हे दर्जेदार दुग्धजन्य उत्पादनांमधील एक विश्वासू नाव आहे, उमेश सूर्यवंशी यांनी शुद्धता आणि परंपरेच्या आवडीने चालवलेले."
        )}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { icon: Heart, title: t("Our Mission", "आमचे ध्येय"), desc: t("To provide pure, fresh and affordable dairy products to every household.", "प्रत्येक घरापर्यंत शुद्ध, ताजी आणि परवडणारी दुग्धजन्य उत्पादने पोहोचवणे.") },
          { icon: Users, title: t("Our Team", "आमचा संघ"), desc: t("A dedicated team of dairy professionals committed to quality.", "दर्जाशी बांधिलकी असलेल्या समर्पित दुग्ध व्यावसायिकांचा संघ.") },
          { icon: TreePine, title: t("Our Values", "आमची मूल्ये"), desc: t("Sustainability, purity and serving our community with the best.", "शाश्वतता, शुद्धता आणि सर्वोत्तम सेवा.") },
        ].map((item, i) => (
          <div
            key={i}
            className="text-center p-8 bg-card rounded-lg border border-border animate-fade-in hover-scale"
            style={{ animationDelay: `${(i + 1) * 150}ms`, animationFillMode: "both" }}
          >
            <item.icon className="h-10 w-10 mx-auto text-primary mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-dairy-green-light rounded-lg p-8 text-center animate-fade-in" style={{ animationDelay: "600ms", animationFillMode: "both" }}>
        <h2 className="font-display text-2xl font-bold mb-2 text-foreground">
          {t("Owner: Umesh Suryawanshi", "मालक: उमेश सूर्यवंशी")}
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {t(
            "With years of experience in the dairy industry, Umesh Suryawanshi has built Aditya Dudh Sankalan Kendra into a household name in Kalamwadi and surrounding areas.",
            "दुग्ध उद्योगातील अनेक वर्षांच्या अनुभवाने, उमेश सूर्यवंशी यांनी आदित्य दूध संकलन केंद्राला काळमवाडी आणि परिसरातील एक ओळखीचे नाव बनवले आहे."
          )}
        </p>
      </div>
    </div>
  );
};

export default About;
