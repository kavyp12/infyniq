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
import AiAssistant from "@/pages/AiAssistant";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
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
          <Route path="/AIassistant" element={<AiAssistant />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;