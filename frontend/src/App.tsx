import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProductProvider } from "@/contexts/ProductContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import AdminRouteGuard from "./components/AdminRouteGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <ProductProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1"><Index /></main>
                  <Footer />
                </div>
              } />
              <Route path="/products" element={
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1"><Products /></main>
                  <Footer />
                </div>
              } />
              <Route path="/products/:id" element={
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1"><ProductDetail /></main>
                  <Footer />
                </div>
              } />
              <Route path="/about" element={
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1"><About /></main>
                  <Footer />
                </div>
              } />
              <Route path="/contact" element={
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1"><Contact /></main>
                  <Footer />
                </div>
              } />
              <Route path="/admin" element={
                <AdminRouteGuard>
                  <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <main className="flex-1"><Admin /></main>
                    <Footer />
                  </div>
                </AdminRouteGuard>
              } />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={
                <AdminRouteGuard>
                  <AdminDashboard />
                </AdminRouteGuard>
              } />
              <Route path="*" element={
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1"><NotFound /></main>
                  <Footer />
                </div>
              } />
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
