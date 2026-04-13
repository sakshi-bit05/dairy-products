import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts } from "@/contexts/ProductContext";
import { categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Products = () => {
  const { lang, t } = useLanguage();
  const { products } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const name = lang === "en" ? p.name_en : p.name_mr;
      const matchSearch = name.toLowerCase().includes(search.toLowerCase());
      const matchCat = !category || p.category === category;
      const matchPrice = !maxPrice || p.price <= maxPrice;
      return matchSearch && matchCat && matchPrice;
    });
  }, [products, search, category, maxPrice, lang]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold mb-8 text-foreground animate-fade-in">
        {t("Our Products", "आमची उत्पादने")}
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("Search products...", "उत्पादने शोधा...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={category === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory("")}
          >
            {t("All", "सर्व")}
          </Button>
          {categories.map((c) => (
            <Button
              key={c.en}
              variant={category === c.en ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(c.en)}
            >
              {lang === "en" ? c.en : c.mr}
            </Button>
          ))}
        </div>
        <Input
          type="number"
          placeholder={t("Max price ₹", "कमाल किंमत ₹")}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
          className="w-40"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-20">
          {t("No products found.", "कोणतेही उत्पादन सापडले नाही.")}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
