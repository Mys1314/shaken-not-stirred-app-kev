
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyBarProvider } from "@/hooks/useMyBar";
import HomePage from "./pages/HomePage";
import CocktailDetailPage from "./pages/CocktailDetailPage";
import MyBarPage from "./pages/MyBarPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MyBarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cocktail/:id" element={<CocktailDetailPage />} />
            <Route path="/my-bar" element={<MyBarPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MyBarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
