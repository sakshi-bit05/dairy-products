import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }: { product: Product }) => {
  const { lang, t } = useLanguage();
  const name = lang === "en" ? product.name_en : product.name_mr;
  const desc = lang === "en" ? product.description_en : product.description_mr;

  return (
    <Card className="dairy-card-hover overflow-hidden border-border">
      <div className="aspect-square overflow-hidden bg-dairy-cream">
        <img
          src={product.image}
          alt={name}
          loading="lazy"
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-lg font-semibold text-foreground">{name}</h3>
          <span className="text-primary font-bold text-lg">₹{product.price}</span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{desc}</p>
        <Link to={`/products/${product.id}`}>
          <Button className="w-full" size="sm">
            {t("View Details", "तपशील पहा")}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
