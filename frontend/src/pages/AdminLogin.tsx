import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LogIn, Milk } from "lucide-react";
import { toast } from "sonner";
import { authenticateAdmin, AdminUser } from "@/data/adminUsers";

const AdminLogin = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/admin-dashboard");
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Clear error on input change
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call delay
    setTimeout(() => {
      // Database authentication
      const authenticatedUser = authenticateAdmin(formData.email, formData.password);
      
      if (authenticatedUser) {
        // Store login session
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminEmail", authenticatedUser.email);
        localStorage.setItem("adminName", authenticatedUser.name);
        localStorage.setItem("adminRole", authenticatedUser.role);
        toast.success(`Welcome back, ${authenticatedUser.name}!`);
        navigate("/admin-dashboard");
      } else {
        setError("Invalid Email or Password");
        toast.error("Invalid credentials");
      }
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dairy-green-light/30 via-white to-dairy-cream/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4 shadow-lg">
            <Milk className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            {t("Aditya Dairy", "आदित्य डेअरी")}
          </h1>
          <p className="text-muted-foreground">
            {t("Admin Portal", "अडमिन पोर्टल")}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                {t("Email Address", "ईमेल पत्ता")}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("Enter your email", "तुमचा ईमेल प्रविष्ट करा")}
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50 hover:shadow-md focus:shadow-lg"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                {t("Password", "पासवर्ड")}
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={t("Enter your password", "तुमचा पासवर्ड प्रविष्ट करा")}
                  className="w-full px-4 py-3 pr-12 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary/50 hover:shadow-md focus:shadow-lg"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm animate-fade-in">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97] shadow-lg hover:shadow-2xl hover:shadow-primary/20 border-2 border-transparent hover:border-primary/30"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  <span>{t("Logging in...", "लॉग इन होत आहे...")}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <LogIn className="w-5 h-5" />
                  <span>{t("Login", "लॉग इन")}</span>
                </div>
              )}
            </Button>
          </form>

                  </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            {t("© 2026 Aditya Dudh Sankalan Kendra", "© २०२६ आदित्य दूध संकलन केंद्र")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
