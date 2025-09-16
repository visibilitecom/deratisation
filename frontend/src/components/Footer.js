import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Shield } from 'lucide-react';

const Footer = () => {
  const zones = [
    'Paris 1er', 'Paris 2e', 'Paris 3e', 'Paris 4e', 'Paris 5e', 'Paris 6e',
    'Paris 7e', 'Paris 8e', 'Paris 9e', 'Paris 10e', 'Paris 11e', 'Paris 12e',
    'Paris 13e', 'Paris 14e', 'Paris 15e', 'Paris 16e', 'Paris 17e', 'Paris 18e',
    'Paris 19e', 'Paris 20e'
  ];

  const departements = [
    'Seine-et-Marne (77)', 'Yvelines (78)', 'Essonne (91)', 
    'Hauts-de-Seine (92)', 'Seine-Saint-Denis (93)', 
    'Val-de-Marne (94)', 'Val-d\'Oise (95)'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">Acces Services</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">21 rue Meynadier</p>
                  <p className="text-sm">75019 Paris</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-green-400 flex-shrink-0" />
                <a href="tel:+33142010707" className="text-sm hover:text-green-400 transition-colors">
                  +33 1 42 01 07 07
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock size={18} className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">Interventions 7j/7</p>
                  <p className="text-sm text-gray-400">Urgences possibles</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield size={18} className="text-green-400 flex-shrink-0" />
                <p className="text-sm">SIRET: 44463188100034</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Nos Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/deratisation-paris" className="text-sm hover:text-green-400 transition-colors">
                  Dératisation Paris
                </Link>
              </li>
              <li>
                <Link to="/punaises-de-lit-paris" className="text-sm hover:text-green-400 transition-colors">
                  Punaises de lit Paris
                </Link>
              </li>
              <li>
                <Link to="/desinsectisation-paris" className="text-sm hover:text-green-400 transition-colors">
                  Désinsectisation Paris
                </Link>
              </li>
              <li>
                <Link to="/secteurs-pro" className="text-sm hover:text-green-400 transition-colors">
                  Secteur Professionnel
                </Link>
              </li>
              <li>
                <Link to="/particuliers" className="text-sm hover:text-green-400 transition-colors">
                  Particuliers
                </Link>
              </li>
            </ul>
          </div>

          {/* Zone Coverage */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Zones d'intervention</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-green-400 mb-2">Paris</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>Tous arrondissements</p>
                  <p>1er au 20e</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-green-400 mb-2">Île-de-France</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  {departements.slice(0, 4).map((dept, index) => (
                    <p key={index}>{dept}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Informations</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/tarifs" className="text-sm hover:text-green-400 transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-sm hover:text-green-400 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-green-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-green-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-400 transition-colors">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-400 transition-colors">
                  Confidentialité
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 Acces Services. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6">
              <span className="trust-badge text-xs">
                <Shield size={14} />
                Conforme HACCP
              </span>
              <span className="trust-badge text-xs">
                Garantie de résultat*
              </span>
            </div>
          </div>
          
          {/* Emergency CTA */}
          <div className="mt-8 p-6 bg-red-600 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Urgence 7j/7 ?</h3>
            <p className="text-sm mb-4">Intervention rapide pour situations critiques</p>
            <a href="tel:+33142010707" className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Phone size={18} />
              Appelle immédiatement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;