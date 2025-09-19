import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { path: '/', label: 'Accueil' },
    { path: '/deratisation-paris', label: 'Dératisation' },
    { path: '/punaises-de-lit-paris', label: 'Punaises de lit' },
    { path: '/desinsectisation-paris', label: 'Désinsectisation' },
    { path: '/secteurs-pro', label: 'Professionnels' },
    { path: '/particuliers', label: 'Particuliers' },
    { path: '/tarifs', label: 'Tarifs' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <header className={`header-sticky transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`} role="banner">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between w-full min-h-[70px]">
            {/* Logo - Fixe à gauche */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center space-x-2"
                aria-label="Acces Services - Accueil"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg" aria-hidden="true">A</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Acces Services</span>
              </Link>
            </div>

            {/* Desktop Navigation - Centré avec moins d'espace */}
            <nav 
              className="hidden lg:flex items-center space-x-4 flex-1 justify-center mx-4"
              role="navigation"
              aria-label="Navigation principale"
            >
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-green-600 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 rounded px-2 py-1 ${
                    location.pathname === item.path ? 'text-green-600' : 'text-gray-700'
                  }`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button - Mobile simplifié */}
            <div className="flex lg:hidden items-center flex-shrink-0 mr-2">
              <a
                href="tel:+33142010707"
                className="text-green-600 font-semibold text-sm"
                aria-label="Appeler"
              >
                <Phone size={16} />
              </a>
            </div>
            
            {/* CTA Button Desktop - Resserré */}
            <div className="hidden lg:flex items-center flex-shrink-0 ml-2 mr-2">
              <a
                href="tel:+33142010707"
                className="btn-primary whitespace-nowrap flex items-center gap-1 text-sm px-4 py-2"
                aria-label="Appeler Acces Services au 01 42 01 07 07"
              >
                <Phone size={16} aria-hidden="true" />
                <span>Appelle-nous</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div 
              className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50"
              id="mobile-menu"
            >
              <nav 
                className="flex flex-col py-4"
                role="navigation"
                aria-label="Navigation mobile"
              >
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                      location.pathname === item.path ? 'text-green-600 bg-green-50' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-4 py-3">
                  <a 
                    href="tel:+33142010707" 
                    className="btn-primary w-full justify-center whitespace-nowrap"
                    aria-label="Appeler Acces Services au 01 42 01 07 07"
                  >
                    <Phone size={18} aria-hidden="true" />
                    Appelle-nous
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Mobile CTA Bar */}
      <div className="mobile-cta-bar">
        <a href="tel:+33142010707" className="flex-1 bg-white text-green-600 text-center py-3 rounded-lg font-semibold flex items-center justify-center gap-2 whitespace-nowrap">
          <Phone size={18} />
          Appel
        </a>
        <a href="#contact-form" className="flex-1 bg-yellow-400 text-gray-900 text-center py-3 rounded-lg font-semibold flex items-center justify-center gap-2 whitespace-nowrap">
          Devis
        </a>
      </div>
    </>
  );
};

export default Header;