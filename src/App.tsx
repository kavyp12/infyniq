import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "@/pages/hero";
import Navbar from "@/pages/navbar";
import Product from "@/pages/product";
import HowItWorks from "@/pages/HowItWorks";
import Reviews from "@/pages/Reviews";
import Footer from "@/pages/footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* 👇 Combine Hero + Product on the same "/" route */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Product />
                <HowItWorks />
                <Reviews />
                <Footer />
              </>
            }
          />
          {/* Keep standalone product route if you still want direct access */}
          <Route path="/product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
