import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Header from "./components/Header";
import Footer from "./components/Footer";

// Homepage critique - pas de lazy loading pour LCP
import Home from "./pages/Home";

// Lazy loading pour les autres pages (améliore LCP)
const DeratisationParis = React.lazy(() => import("./pages/DeratisationParis"));
const PunaisesLitParis = React.lazy(() => import("./pages/PunaisesLitParis"));
const DesinsectisationParis = React.lazy(() => import("./pages/DesinsectisationParis"));
const SecteursPro = React.lazy(() => import("./pages/SecteursPro"));
const Particuliers = React.lazy(() => import("./pages/Particuliers"));
const ZonesIntervention = React.lazy(() => import("./pages/ZonesIntervention"));
const Tarifs = React.lazy(() => import("./pages/Tarifs"));
const APropos = React.lazy(() => import("./pages/APropos"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const Contact = React.lazy(() => import("./pages/Contact"));

// Composant de loading pour LCP
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="loading-skeleton w-full max-w-4xl h-96 rounded-lg"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deratisation-paris" element={<DeratisationParis />} />
              <Route path="/punaises-de-lit-paris" element={<PunaisesLitParis />} />
              <Route path="/desinsectisation-paris" element={<DesinsectisationParis />} />
              <Route path="/secteurs-pro" element={<SecteursPro />} />
              <Route path="/particuliers" element={<Particuliers />} />
              <Route path="/zones-intervention" element={<ZonesIntervention />} />
              <Route path="/tarifs" element={<Tarifs />} />
              <Route path="/a-propos" element={<APropos />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;