import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts } from "@/contexts/ProductContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Clock, Thermometer, Ruler } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const { getProduct } = useProducts();
  const p = getProduct(id || "");

  // State for selected quantity and dynamic price
  const [selectedSize, setSelectedSize] = useState<string>(p?.sizes[0] || "");
  
  // Get price for selected size, fallback to default price if no pricing object
  const getCurrentPrice = () => {
    if (!p) return 0;
    if (p.pricing && p.pricing[selectedSize]) {
      return p.pricing[selectedSize];
    }
    return p.price;
  };

  if (!p) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground text-lg">{t("Product not found.", "उत्पादन सापडले नाही.")}</p>
        <Link to="/products"><Button className="mt-4">{t("Back to Products", "उत्पादनांकडे परत")}</Button></Link>
      </div>
    );
  }

  const name = lang === "en" ? p.name_en : p.name_mr;
  const desc = lang === "en" ? p.description_en : p.description_mr;
  const ingredients = lang === "en" ? p.ingredients_en : p.ingredients_mr;
  const expiry = lang === "en" ? p.expiry : p.expiry_mr;
  const storage = lang === "en" ? p.storage_en : p.storage_mr;
  const cat = lang === "en" ? p.category : p.category_mr;

  const details = [
    { icon: Package, label: t("Ingredients", "घटक"), value: ingredients },
    { icon: Clock, label: t("Shelf Life", "टिकाऊपणा"), value: expiry },
    { icon: Thermometer, label: t("Storage", "साठवण"), value: storage },
    { icon: Ruler, label: t("Available Sizes", "उपलब्ध आकार"), value: p.sizes.join(", ") },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/products" className="inline-flex items-center gap-1 text-primary mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        {t("Back to Products", "उत्पादनांकडे परत")}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="rounded-lg overflow-hidden bg-dairy-cream animate-scale-in">
          <img src={p.image} alt={name} className="w-full h-auto object-cover" width={800} height={800} />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "150ms", animationFillMode: "both" }}>
          <span className="text-sm text-secondary font-medium">{cat}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1 mb-2">{name}</h1>
          
          {/* Dynamic Price Display */}
          <p className="text-3xl font-bold text-primary mb-4">₹{getCurrentPrice()}</p>
          
          {/* Quantity Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {t("Select Quantity", "प्रमाण निवडा")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {p.sizes.map((size) => (
                <label
                  key={size}
                  className={`
                    relative flex cursor-pointer items-center justify-center rounded-lg border-2 
                    px-4 py-2 text-sm font-medium transition-all duration-200
                    ${selectedSize === size 
                      ? 'border-primary bg-primary text-primary-foreground shadow-sm' 
                      : 'border-muted bg-background text-foreground hover:border-primary/50 hover:bg-muted/50'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="quantity"
                    value={size}
                    checked={selectedSize === size}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="sr-only"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
          
          <p className="text-muted-foreground leading-relaxed mb-6">{desc}</p>

          {/* Nutrition */}
          <div className="bg-dairy-green-light rounded-lg p-4 mb-6">
            <h3 className="font-display font-semibold text-foreground mb-1">{t("Nutrition Facts", "पोषण माहिती")}</h3>
            <p className="text-sm text-muted-foreground">{p.nutrition}</p>
          </div>

          {/* Details */}
          <div className="space-y-4">
            {details.map((d, i) => (
              <div
                key={i}
                className="flex items-start gap-3 animate-fade-in"
                style={{ animationDelay: `${300 + i * 100}ms`, animationFillMode: "both" }}
              >
                <d.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-foreground">{d.label}</span>
                  <p className="text-sm text-muted-foreground">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
