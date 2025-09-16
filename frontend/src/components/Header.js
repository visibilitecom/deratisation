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
    { path: '/tarifs', label: 'Tarifs' }
  ];

  return (
    <>
      <header className={`header-sticky transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between w-full min-h-[70px]">
            {/* Logo - Fixe à gauche */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Acces Services</span>
              </Link>
            </div>

            {/* Desktop Navigation - Centré */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center mx-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-green-600 whitespace-nowrap ${
                    location.pathname === item.path ? 'text-green-600' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button - Visible sur desktop */}
            <div className="flex items-center flex-shrink-0 ml-6">
              <a
                href="tel:+33142010707"
                className="btn-primary whitespace-nowrap flex items-center gap-2"
              >
                <Phone size={18} />
                <span>Appelle-nous</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
              <nav className="flex flex-col py-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-50 ${
                      location.pathname === item.path ? 'text-green-600 bg-green-50' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-4 py-3">
                  <a href="tel:+33142010707" className="btn-primary w-full justify-center whitespace-nowrap">
                    <Phone size={18} />
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