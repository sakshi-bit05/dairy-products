import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts } from "@/contexts/ProductContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Milk, Package, Users, TrendingUp, LogOut, Plus, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { logoutAdmin, getCurrentAdmin } from "@/data/adminUsers";

const AdminDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { products } = useProducts();
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Check authentication and load user data
  useEffect(() => {
    const admin = getCurrentAdmin();
    
    if (!admin) {
      toast.error("Please login to access admin dashboard");
      navigate("/admin-login");
      return;
    }

    setCurrentUser(admin);
  }, [navigate]);

  const handleLogout = () => {
    // Clear all session data
    logoutAdmin();
    
    // Clear any additional localStorage items
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminLastLogin');
    
    // Clear sessionStorage as well
    sessionStorage.clear();
    
    // Show success message
    toast.success("Logged out successfully");
    
    // Redirect to home page instead of admin login
    navigate("/");
  };

  const handleManageProducts = () => {
    navigate("/admin");
  };

  // Calculate statistics with proper fallbacks
  const totalProducts = products?.length || 0;
  const categories = products?.length > 0 
    ? [...new Set(products.map(p => p?.category || 'Other'))].length 
    : 0;
  const avgPrice = products?.length > 0 
    ? Math.round(products.reduce((sum, p) => sum + (p?.price || 0), 0) / products.length)
    : 0;

  const stats = [
    {
      title: t("Total Products", "एकूण उत्पादने"),
      value: totalProducts,
      icon: Package,
      color: "text-dairy-green",
      bgColor: "bg-dairy-green-light"
    },
    {
      title: t("Categories", "श्रेण्या"),
      value: categories,
      icon: Milk,
      color: "text-dairy-gold",
      bgColor: "bg-dairy-cream"
    },
    {
      title: t("Avg Price", "सरासरी किंमत"),
      value: `₹${avgPrice}`,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  const recentProducts = products?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dairy-green-light/20 via-white to-dairy-cream/10">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Milk className="w-8 h-8 text-primary" />
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {t("Admin Dashboard", "अडमिन डॅशबोर्ड")}
                </h1>
              </div>
              <span className="text-sm text-muted-foreground">
                {t("Aditya Dairy Management", "आदित्य डेअरी व्यवस्थापन")}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                <span>{t("Logout", "Logout")}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {t("Welcome back", "पुन्हा स्वागत")}, {currentUser?.name || t("Admin", "अडमिन")}!
          </h2>
          <p className="text-muted-foreground">
            {t("Manage your dairy products and monitor your business performance", "तुमचे दुग्धजन्य उत्पादने व्यवस्थापित करा आणि तुमच्या व्यवसायाची कामगिरी निरीक्षण करा")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="border border-border shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in bg-gradient-to-br from-card to-card/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground hover:text-primary transition-colors duration-200">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-4 rounded-full ${stat.bgColor} hover:scale-110 transition-transform duration-200 shadow-md`}>
                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-primary" />
                <span>{t("Product Management", "उत्पादन व्यवस्थापन")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t("Add, edit, or remove products from your inventory", "तुमच्या इन्व्हेन्टरीमधून उत्पादने जोडा, संपादित करा किंवा काढा")}
              </p>
              <Button 
                onClick={handleManageProducts}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Edit className="w-4 h-4 mr-2" />
                {t("Manage Products", "उत्पादने व्यवस्थापित करा")}
              </Button>
            </CardContent>
          </Card>

                  </div>

        {/* Recent Products */}
        <Card className="border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-primary" />
                <span>{t("Recent Products", "अलीकडील उत्पादने")}</span>
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleManageProducts}
              >
                <Eye className="w-4 h-4 mr-2" />
                {t("View All", "सर्व पहा")}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-dairy-cream rounded-lg flex items-center justify-center">
                      <Milk className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{product.name_en || 'Unknown Product'}</h4>
                      <p className="text-sm text-muted-foreground">{product.category || 'Uncategorized'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">Rs{product.price || 0}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("per unit", "per unit")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
