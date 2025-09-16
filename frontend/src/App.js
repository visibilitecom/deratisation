import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DeratisationParis from "./pages/DeratisationParis";
import PunaisesLitParis from "./pages/PunaisesLitParis";
import DesinsectisationParis from "./pages/DesinsectisationParis";
import SecteursPro from "./pages/SecteursPro";
import Particuliers from "./pages/Particuliers";
import ZonesIntervention from "./pages/ZonesIntervention";
import Tarifs from "./pages/Tarifs";
import APropos from "./pages/APropos";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

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