import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

// --- Public facing pages (assuming these files exist as in the original App.tsx) ---
import Hero from "@/pages/hero";
import Navbar from "@/pages/navbar";
import Product from "@/pages/product";
import HowItWorks from "@/pages/HowItWorks";
import Reviews from "@/pages/Reviews";
import Footer from "@/pages/footer";
import ProfileSettings from '@/pages/ProfileSettings';

import RegenerateKey from '@/pages/RegenerateKey';

// --- Auth pages ---
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

// --- Protected application layout and pages ---
import AppLayout from "@/pages/AppLayout";
import Dashboard from "@/pages/Dashboard";
import AiAssistant from "@/pages/AiAssistant";
import DatabaseSetup from "@/pages/DatabaseSetup";
import DatabaseDetails from './pages/DatabaseDetails';

const queryClient = new QueryClient();

/**
 * A wrapper component that checks for user authentication.
 * If the user is not logged in (i.e., no 'user_id' in localStorage),
 * it redirects them to the /signin page.
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userId = localStorage.getItem('user_id');
  return userId ? <>{children}</> : <Navigate to="/signin" replace />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* --- Public Routes --- */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Hero />
                  <Product />
                  <HowItWorks />
                  <Reviews />
                  <Footer />
                </>
              }
            />
            <Route path="/product" element={<Product />} />

            {/* --- Authentication Routes --- */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* --- Protected Application Routes --- */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/app" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-assistant" element={<AiAssistant />} />
              <Route path="/setup" element={<DatabaseSetup />} />
              <Route path="/database-details" element={<DatabaseDetails />} />
              
              {/* MOVED INSIDE AppLayout */}
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/profile/regenerate-key" element={<RegenerateKey />} />
            </Route>

            {/* --- Catch-all Route --- */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
