import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

const DeratisationParis = () => {
  const symptoms = [
    'Excréments de rongeurs (crottes noires)',
    'Bruits de grattements dans les murs',
    'Traces de grignotage sur emballages',
    'Odeur d\'urine caractéristique',
    'Traces de passage (poils, taches)'
  ];

  const risks = [
    'Contamination alimentaire',
    'Transmission de maladies',
    'Dégâts matériels importants',
    'Non-conformité HACCP',
    'Fermeture administrative'
  ];

  const methods = [
    {
      title: 'Inspection complète',
      description: 'Identification des espèces, points d\'entrée et nidification'
    },
    {
      title: 'Appâts sécurisés',
      description: 'Stations d\'appâtage professionnel, sécurisées'
    },
    {
      title: 'Pièges mécaniques',
      description: 'Pièges adaptés selon les zones et contraintes'
    },
    {
      title: 'Obturations',
      description: 'Bouchage des points d\'entrée identifiés'
    },
    {
      title: 'Suivi régulier',
      description: 'Contrôles et renouvellement des appâts'
    }
  ];

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link to="/" className="text-green-600 hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Dératisation Paris</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-green-50 section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="section-title mb-6">
              Dératisation à Paris et Île-de-France
            </h1>
            <p className="section-subtitle">
              Élimination professionnelle des rats et souris. Intervention rapide, 
              méthodes certifiées et respect des normes HACCP pour professionnels.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+33142010707" className="btn-primary text-lg px-8 py-4">
                <Phone size={20} />
                Intervention d'urgence
              </a>
              <a href="#contact-form" className="btn-secondary text-lg px-8 py-4">
                <FileText size={20} />
                Devis gratuit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="section-title text-left">
                  Tu as des rongeurs ?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Détecte rapidement la présence de rats ou souris grâce à ces signes caractéristiques.
                </p>
                
                <div className="space-y-4">
                  {symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertTriangle size={20} className="text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{symptom}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <a href="tel:+33142010707" className="btn-primary">
                    <Phone size={18} />
                    Appelle maintenant
                  </a>
                </div>
              </div>
              
              <div className="bg-red-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6 text-red-800">
                  ⚠️ Risques sanitaires
                </h3>
                <div className="space-y-3">
                  {risks.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Shield size={18} className="text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-red-700">{risk}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-red-100 rounded-lg">
                  <p className="text-sm text-red-800 font-medium">
                    ⚡ Pour les professionnels de l'alimentaire : obligation légale de traitement (HACCP)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methods Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Notre méthode IPM (Integrated Pest Management)</h2>
            <p className="section-subtitle">
              Approche professionnelle respectueuse de l'environnement et conforme aux réglementations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {methods.map((method, index) => (
              <div key={index} className="service-card text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{method.title}</h3>
                <p className="text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-16">Déroulement de l'intervention</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Diagnostic gratuit</h3>
                  <p className="text-gray-600">Inspection complète des locaux, identification des espèces et évaluation de l'infestation. Établissement d'un plan d'action personnalisé.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Traitement ciblé</h3>
                  <p className="text-gray-600">Mise en place des dispositifs adaptés : appâts sécurisés, pièges, obturations. Respect strict des normes de sécurité alimentaire.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Rapport & suivi</h3>
                  <p className="text-gray-600">Remise du rapport d'intervention avec plan des dispositifs. Suivi régulier et ajustements si nécessaire. Traçabilité complète.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <div className="bg-green-50 p-6 rounded-lg inline-block">
                <CheckCircle size={24} className="text-green-600 mx-auto mb-4" />
                <p className="font-semibold text-green-800">Garantie de résultat*</p>
                <p className="text-sm text-green-600 mt-2">*Selon conditions du contrat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white section-padding">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'une dératisation rapide ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Intervention d'urgence 7j/7 à Paris et en Île-de-France
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+33142010707" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Phone size={20} />
              +33 1 42 01 07 07
            </a>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center gap-2">
              <FileText size={20} />
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeratisationParis;