import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

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

  // Données structurées pour le service de dératisation
  const deratisationStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Dératisation Paris",
    "description": "Service professionnel de dératisation à Paris et Île-de-France. Élimination rats et souris, méthodes certifiées HACCP.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Acces Services",
      "telephone": "+33142010707",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "21 rue Meynadier",
        "addressLocality": "Paris",
        "postalCode": "75019",
        "addressCountry": "FR"
      }
    },
    "areaServed": [
      "Paris", "Île-de-France", "75001", "75002", "75003", "75004", "75005", 
      "75006", "75007", "75008", "75009", "75010", "75011", "75012", "75013", 
      "75014", "75015", "75016", "75017", "75018", "75019", "75020"
    ],
    "offers": {
      "@type": "Offer",
      "description": "Dératisation professionnelle Paris",
      "priceRange": "120€-300€"
    }
  };

  // Breadcrumbs
  const breadcrumbs = [
    { name: 'Accueil', url: '/' },
    { name: 'Dératisation Paris', url: '/deratisation-paris' }
  ];

  return (
    <>
      <SEOHead
        title="Dératisation Paris - Expert Rats Souris | Acces Services"
        description="★ Dératisation professionnelle à Paris et IDF. Élimination rats et souris garantie. Méthodes certifiées HACCP. Devis gratuit ☎ 01 42 01 07 07"
        keywords="dératisation Paris, dératisation rats Paris, dératisation souris Paris, exterminateur Paris, dératisation restaurant Paris, dératisation immeuble Paris, dératisation urgence Paris, prix dératisation Paris, entreprise dératisation Paris, dératisation 75, dératisation Île-de-France"
        canonicalUrl="/deratisation-paris"
        breadcrumbs={breadcrumbs}
        structuredData={deratisationStructuredData}
      />
      
      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <div className="container mx-auto px-4">
            <nav className="text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
              <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" className="text-green-600 hover:underline" itemProp="item">
                  <span itemProp="name">Accueil</span>
                </Link>
                <meta itemProp="position" content="1" />
              </span>
              <span className="mx-2">/</span>
              <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-gray-600" itemProp="name">Dératisation Paris</span>
                <meta itemProp="position" content="2" />
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="hero-bg section-padding" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6952)'}}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center hero-content">
              <h1 className="section-title mb-6">
                Dératisation Paris - Expert Rats et Souris
              </h1>
              <p className="section-subtitle">
                Dératisation professionnelle à Paris et Île-de-France. Intervention rapide, 
                méthodes certifiées HACCP et respect des normes pour professionnels et particuliers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+33142010707" className="btn-primary text-lg px-8 py-4">
                  <Phone size={20} />
                  Dératisation urgence Paris
                </a>
                <a href="https://www.3dassistance.fr/contact" target="_blank" rel="noopener noreferrer" className="btn-secondary text-lg px-8 py-4">
                  <FileText size={20} />
                  Devis immédiat
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
                    Signes de présence de rats et souris à Paris
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Identifie rapidement la présence de rongeurs dans ton logement parisien grâce à ces signes caractéristiques de rats et souris.
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
                      Dératisation Paris maintenant
                    </a>
                  </div>
                </div>
                
                <div className="bg-red-50 p-8 rounded-lg">
                  <h3 className="text-xl font-semibold mb-6 text-red-800">
                    ⚠️ Risques sanitaires rats et souris Paris
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
                      ⚡ Restaurants Paris : obligation légale dératisation (normes HACCP)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Methods Section */}
        <section className="section-padding bg-gray-50" itemScope itemType="https://schema.org/Service">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="section-title">Méthode dératisation IPM Paris (Integrated Pest Management)</h2>
              <p className="section-subtitle">
                Dératisation professionnelle Paris respectueuse de l'environnement et conforme aux réglementations
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {methods.map((method, index) => (
                <article key={index} className="service-card text-center" itemScope itemType="https://schema.org/Service">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900" itemProp="name">{method.title}</h3>
                  <p className="text-gray-600" itemProp="description">{method.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center mb-16">Déroulement dératisation Paris</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Diagnostic dératisation gratuit Paris</h3>
                    <p className="text-gray-600">Inspection complète de ton logement parisien, identification des espèces de rongeurs (rats, souris) et évaluation de l'infestation. Établissement d'un plan d'action personnalisé de dératisation.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Traitement dératisation ciblé Paris</h3>
                    <p className="text-gray-600">Mise en place des dispositifs de dératisation adaptés : appâts sécurisés, pièges, obturations. Respect strict des normes de sécurité alimentaire pour les professionnels parisiens.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Rapport dératisation & suivi Paris</h3>
                    <p className="text-gray-600">Remise du rapport d'intervention dératisation avec plan des dispositifs. Suivi régulier et ajustements si nécessaire. Traçabilité complète pour les professionnels parisiens.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <div className="bg-green-50 p-6 rounded-lg inline-block">
                  <CheckCircle size={24} className="text-green-600 mx-auto mb-4" />
                  <p className="font-semibold text-green-800">Garantie dératisation Paris*</p>
                  <p className="text-sm text-green-600 mt-2">*Selon conditions du contrat dératisation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-600 text-white section-padding">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Besoin dératisation rapide Paris ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Dératisation d'urgence 7j/7 à Paris et en Île-de-France - Rats, souris, intervention immédiate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+33142010707" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                <Phone size={20} />
                Dératisation Paris : 01 42 01 07 07
              </a>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center gap-2">
                <FileText size={20} />
                Devis dératisation Paris
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DeratisationParis;