import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, Shield, CheckCircle, AlertTriangle, Thermometer } from 'lucide-react';

const PunaisesLitParis = () => {
  const signs = [
    'Piqûres alignées sur la peau au réveil',
    'Taches de sang sur les draps',
    'Punaises vivantes dans le matelas',
    'Odeur douceâtre caractéristique',
    'Traces noires (excréments) sur le sommier'
  ];

  const protocol = [
    {
      title: 'Inspection minutieuse',
      description: 'Détection des foyers d\'infestation avec équipement spécialisé',
      icon: '🔍'
    },
    {
      title: 'CheckList de préparation',
      description: 'Instructions précises pour optimiser l\'efficacité du traitement',
      icon: '📋'
    },
    {
      title: 'Traitement chimique',
      description: 'Pulvérisation d\'insecticides professionnels homologués',
      icon: '💨'
    },
    {
      title: 'Traitement thermique',
      description: 'Vapeur sèche 180°C si nécessaire (zones sensibles)',
      icon: '🌡️'
    },
    {
      title: 'Contrôle & 2e passage',
      description: 'Vérification à 15 jours et nouveau traitement si besoin',
      icon: '🔄'
    },
    {
      title: 'Conseils post-traitement',
      description: 'Guide pour éviter la réinfestation et optimiser les résultats',
      icon: '💡'
    }
  ];

  const preparation = [
    'Laver le linge à 60°C minimum',
    'Aspirer matelas, sommier et sol',
    'Démonter le lit si possible',
    'Vider les tiroirs à proximité',
    'Prévoir de sortir 4h après traitement'
  ];

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link to="/" className="text-green-600 hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Punaises de lit Paris</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-bg section-padding" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1628352081506-83c43123ed6d)'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center hero-content">
            <h1 className="section-title mb-6">
              Traitement Punaises de lit à Paris
            </h1>
            <p className="section-subtitle">
              Protocole professionnel en 2 passages. Éradication garantie avec méthodes 
              chimiques et thermiques. Discrétion assurée.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+33142010707" className="btn-primary text-lg px-8 py-4">
                <Phone size={20} />
                Urgence punaises
              </a>
              <a href="#contact-form" className="btn-secondary text-lg px-8 py-4">
                <FileText size={20} />
                Devis immédiat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="section-title text-left">
                  Comment détecter les punaises ?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Les punaises de lit sont expertes en camouflage. Voici les signes qui ne trompent pas.
                </p>
                
                <div className="space-y-4">
                  {signs.map((sign, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertTriangle size={20} className="text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{sign}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">
                    <strong>⚡ Action rapide requise :</strong> Plus tu attends, plus l'infestation s'étend. 
                    Une femelle pond jusqu'à 500 œufs !
                  </p>
                </div>
              </div>
              
              <div className="bg-red-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6 text-red-800">
                  🛏️ Zones à inspecter en priorité
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={18} className="text-red-600" />
                    <span className="text-red-700">Coutures du matelas</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={18} className="text-red-600" />
                    <span className="text-red-700">Fissures du sommier</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={18} className="text-red-600" />
                    <span className="text-red-700">Tête de lit</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={18} className="text-red-600" />
                    <span className="text-red-700">Rideaux et tissus</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={18} className="text-red-600" />
                    <span className="text-red-700">Prises électriques</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Notre protocole professionnel</h2>
            <p className="section-subtitle">
              Méthode éprouvée en 6 étapes pour une éradication complète
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {protocol.map((step, index) => (
              <div key={index} className="service-card text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4 mx-auto">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-12">Que préparer avant notre venue ?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6 text-blue-800">
                  📝 CheckList de préparation
                </h3>
                <div className="space-y-4">
                  {preparation.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-blue-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Thermometer size={18} className="mr-2" />
                    Traitement linge
                  </h4>
                  <p className="text-sm text-green-700">
                    Lave tout le linge à 60°C minimum ou congèle-le 72h. 
                    Les punaises meurent aux températures extrêmes.
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <Shield size={18} className="mr-2" />
                    Sécurité enfants/animaux
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Éloigne enfants et animaux 4h après traitement. 
                    Aère bien les pièces avant réintégration.
                  </p>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">
                    ⏰ Délais de réintégration
                  </h4>
                  <p className="text-sm text-red-700">
                    Sortie obligatoire pendant 4h. Possibilité de dormir 
                    le soir même après aération complète.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <div className="bg-green-50 p-6 rounded-lg inline-block">
                <CheckCircle size={24} className="text-green-600 mx-auto mb-4" />
                <p className="font-semibold text-green-800">Garantie 2 passages incluse</p>
                <p className="text-sm text-green-600 mt-2">Contrôle à 15 jours et retraitement si nécessaire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white section-padding">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Punaises détectées ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Intervention rapide et discrète - Résultats garantis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+33142010707" className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Phone size={20} />
              Appel d'urgence
            </a>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors inline-flex items-center gap-2">
              <FileText size={20} />
              Devis express
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PunaisesLitParis;