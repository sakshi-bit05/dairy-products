import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts } from "@/contexts/ProductContext";
import { categories, Product } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { toast } from "sonner";

const emptyForm = {
  name_en: "", name_mr: "", price: 0, description_en: "", description_mr: "",
  category: "Milk Products", category_mr: "दूध उत्पादने", image: "",
  ingredients_en: "", ingredients_mr: "", nutrition: "", expiry: "", expiry_mr: "",
  storage_en: "", storage_mr: "", sizes: ["500g"],
};

const Admin = () => {
  const { lang, t } = useLanguage();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(emptyForm);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (p: Product) => {
    const { id, ...rest } = p;
    setForm(rest);
    setEditId(id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name_en.trim()) return toast.error(t("Name is required", "नाव आवश्यक आहे"));
    if (editId) {
      updateProduct(editId, form);
      toast.success(t("Product updated!", "उत्पादन अपडेट केले!"));
    } else {
      addProduct(form);
      toast.success(t("Product added!", "उत्पादन जोडले!"));
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success(t("Product deleted!", "उत्पादन हटवले!"));
  };

  const handleCategoryChange = (catEn: string) => {
    const cat = categories.find((c) => c.en === catEn);
    setForm({ ...form, category: catEn, category_mr: cat?.mr || "" });
  };

  const set = (key: string, val: string | number | string[]) => setForm({ ...form, [key]: val });

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          {t("Admin Panel", "अ‍ॅडमिन पॅनेल")}
        </h1>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4 mr-1" />
          {t("Add Product", "उत्पादन जोडा")}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              {editId ? t("Edit Product", "उत्पादन संपादित करा") : t("Add Product", "नवीन उत्पादन")}
            </h2>
            <button onClick={() => setShowForm(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Name (EN)" value={form.name_en} onChange={(e) => set("name_en", e.target.value)} required />
            <Input placeholder="नाव (MR)" value={form.name_mr} onChange={(e) => set("name_mr", e.target.value)} />
            <Input type="number" placeholder="Price ₹" value={form.price || ""} onChange={(e) => set("price", Number(e.target.value))} required />
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.en} value={c.en}>{lang === "en" ? c.en : c.mr}</option>
              ))}
            </select>
            <Input placeholder="Image URL" value={form.image} onChange={(e) => set("image", e.target.value)} />
            <Input placeholder="Sizes (comma separated)" value={form.sizes.join(", ")} onChange={(e) => set("sizes", e.target.value.split(",").map(s => s.trim()))} />
            <Textarea placeholder="Description (EN)" value={form.description_en} onChange={(e) => set("description_en", e.target.value)} />
            <Textarea placeholder="वर्णन (MR)" value={form.description_mr} onChange={(e) => set("description_mr", e.target.value)} />
            <Input placeholder="Ingredients (EN)" value={form.ingredients_en} onChange={(e) => set("ingredients_en", e.target.value)} />
            <Input placeholder="घटक (MR)" value={form.ingredients_mr} onChange={(e) => set("ingredients_mr", e.target.value)} />
            <Input placeholder="Nutrition" value={form.nutrition} onChange={(e) => set("nutrition", e.target.value)} />
            <Input placeholder="Expiry (EN)" value={form.expiry} onChange={(e) => set("expiry", e.target.value)} />
            <Input placeholder="टिकाऊपणा (MR)" value={form.expiry_mr} onChange={(e) => set("expiry_mr", e.target.value)} />
            <Input placeholder="Storage (EN)" value={form.storage_en} onChange={(e) => set("storage_en", e.target.value)} />
            <Input placeholder="साठवण (MR)" value={form.storage_mr} onChange={(e) => set("storage_mr", e.target.value)} />
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                {editId ? t("Update Product", "उत्पादन अपडेट करा") : t("Add Product", "उत्पादन जोडा")}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="border border-border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("Image", "चित्र")}</TableHead>
              <TableHead>{t("Name", "नाव")}</TableHead>
              <TableHead>{t("Category", "वर्ग")}</TableHead>
              <TableHead>{t("Price", "किंमत")}</TableHead>
              <TableHead className="text-right">{t("Actions", "क्रिया")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <img src={p.image} alt={p.name_en} className="h-12 w-12 rounded object-cover" loading="lazy" width={48} height={48} />
                </TableCell>
                <TableCell className="font-medium">
                  {lang === "en" ? p.name_en : p.name_mr}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {lang === "en" ? p.category : p.category_mr}
                </TableCell>
                <TableCell>₹{p.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(p)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;
