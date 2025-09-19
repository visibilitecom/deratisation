import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Phone, Home, Mail, Clock } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Merci = () => {
  const [searchParams] = useSearchParams();
  const nom = searchParams.get('nom') || 'Cher client';
  const typeProbleme = searchParams.get('type') || 'votre demande';

  useEffect(() => {
    // Scroll to top au chargement
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        title="Merci pour votre demande - Acces Services Dératisation Paris"
        description="Votre demande de devis dératisation a bien été envoyée. Notre équipe vous recontacte sous 2h pour une intervention rapide à Paris et IDF."
        keywords="merci, confirmation, devis dératisation, contact acces services"
        ogImage="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=630&fit=crop"
      />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section Merci */}
        <section className="section-padding text-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              
              {/* Icône de succès */}
              <div className="mb-8">
                <CheckCircle size={80} className="text-green-600 mx-auto mb-4" />
                <div className="w-20 h-1 bg-green-600 mx-auto rounded-full"></div>
              </div>

              {/* Message principal */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Merci {nom} !
              </h1>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  📧 Votre demande a été envoyée avec succès
                </h2>
                
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Mail className="text-green-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Email envoyé à :</p>
                      <p className="text-green-600 font-semibold">contact@3dassistance.fr</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Clock className="text-blue-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Délai de réponse :</p>
                      <p className="text-blue-600 font-semibold">Sous 2h en moyenne</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <CheckCircle className="text-orange-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Concernant :</p>
                      <p className="text-orange-600 font-semibold">{typeProbleme}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prochaines étapes */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">🎯 Prochaines étapes :</h3>
                <div className="space-y-2 text-sm">
                  <p>✅ Votre email arrive dans notre boîte de réception</p>
                  <p>✅ Un expert analyse votre demande</p>
                  <p>✅ Vous recevez un devis personnalisé sous 2h</p>
                  <p>✅ Intervention possible dans la journée</p>
                </div>
              </div>

              {/* Urgence */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-3">
                  🚨 Intervention urgente ?
                </h3>
                <p className="text-red-700 mb-4">
                  Pour une intervention immédiate (rats, invasion massive, restaurant...)
                </p>
                <a 
                  href="tel:+33142010707" 
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  <Phone size={20} />
                  Appel d'urgence : 01 42 01 07 07
                </a>
              </div>

              {/* Actions suivantes */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <Home size={20} />
                  Retour à l'accueil
                </Link>
                
                <Link 
                  to="/faq" 
                  className="inline-flex items-center gap-2 border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Questions fréquentes
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section informative */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                Pourquoi choisir Acces Services ?
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-green-600" size={24} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Intervention rapide</h4>
                  <p className="text-gray-600 text-sm">Réponse sous 2h, intervention possible le jour même</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-blue-600" size={24} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Garantie résultat</h4>
                  <p className="text-gray-600 text-sm">Solutions efficaces avec garantie de résultat</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="text-purple-600" size={24} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">7j/7 disponible</h4>
                  <p className="text-gray-600 text-sm">Service client et interventions tous les jours</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Merci;