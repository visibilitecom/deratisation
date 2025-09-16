import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, Shield, CheckCircle, Bug } from 'lucide-react';

const DesinsectisationParis = () => {
  const insects = [
    {
      name: 'Cafards / Blattes',
      description: 'Élimination complète avec gel professionnel et pulvérisation ciblée',
      icon: '🪳',
      zones: 'Cuisines, salles de bain, locaux techniques'
    },
    {
      name: 'Fourmis',
      description: 'Traitement des colonies et points d\'entrée avec appâts spécialisés',
      icon: '🐜',
      zones: 'Jardins, terrasses, cuisines, magasins'
    },
    {
      name: 'Puces',
      description: 'Traitement environnemental complet, efficace sur œufs et adultes',
      icon: '🦟',
      zones: 'Moquettes, parquets, textiles, niches'
    },
    {
      name: 'Mites alimentaires',
      description: 'Élimination et prévention avec traitement des denrées contaminées',
      icon: '🦋',
      zones: 'Placards, réserves, magasins alimentaires'
    },
    {
      name: 'Mouches & Moustiques',
      description: 'Contrôle des populations avec pièges et traitements larvicides',
      icon: '🪰',
      zones: 'Restaurants, terrasses, cours d\'eau'
    },
    {
      name: 'Guêpes & Frelons',
      description: 'Destruction de nids avec équipement de protection complet',
      icon: '🐝',
      zones: 'Toitures, jardins, balcons, volets'
    }
  ];

  const methods = [
    {
      title: 'Gel professionnel',
      description: 'Application ciblée dans les fissures et passages d\'insectes',
      effectiveness: 'Très efficace sur cafards et fourmis'
    },
    {
      title: 'Pulvérisation localisée',
      description: 'Traitement des surfaces avec insecticides homologués',
      effectiveness: 'Action rapide et rémanente'
    },
    {
      title: 'Appâts sélectifs',
      description: 'Stations d\'appâtage sécurisées pour élimination des colonies',
      effectiveness: 'Effet domino sur toute la colonie'
    },
    {
      title: 'Traitement thermique',
      description: 'Vapeur sèche pour zones sensibles sans produit chimique',
      effectiveness: 'Éco-responsable et efficace'
    }
  ];

  const prevention = [
    'Élimination des sources d\'eau stagnante',
    'Bouchage des fissures et points d\'entrée',
    'Nettoyage approfondi des zones à risque',
    'Installation de pièges de monitoring',
    'Formation du personnel aux bonnes pratiques'
  ];

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link to="/" className="text-green-600 hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Désinsectisation Paris</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-blue-50 section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="section-title mb-6">
              Désinsectisation à Paris et Île-de-France
            </h1>
            <p className="section-subtitle">
              Traitement professionnel contre tous types d'insectes nuisibles. 
              Méthodes ciblées et respectueuses de l'environnement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+33142010707" className="btn-primary text-lg px-8 py-4">
                <Phone size={20} />
                Intervention rapide
              </a>
              <a href="#contact-form" className="btn-secondary text-lg px-8 py-4">
                <FileText size={20} />
                Devis personnalisé
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Insects Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Insectes traités</h2>
            <p className="section-subtitle">Solutions spécialisées pour chaque type de nuisible</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insects.map((insect, index) => (
              <div key={index} className="service-card">
                <div className="text-4xl mb-4 text-center">{insect.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">{insect.name}</h3>
                <p className="text-gray-600 mb-4">{insect.description}</p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Zones d'intervention :</strong> {insect.zones}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos méthodes de traitement</h2>
            <p className="section-subtitle">
              Techniques professionnelles adaptées à chaque situation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {methods.map((method, index) => (
              <div key={index} className="service-card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Bug size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{method.title}</h3>
                    <p className="text-gray-600 mb-3">{method.description}</p>
                    <div className="bg-green-100 p-2 rounded">
                      <p className="text-sm text-green-800 font-medium">{method.effectiveness}</p>
                    </div>
                  </div>
                </div>
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
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Identification des nuisibles</h3>
                  <p className="text-gray-600">Diagnostic précis de l'espèce, évaluation de l'infestation et recherche des causes. Chaque insecte nécessite une approche spécifique.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Traitement adapté</h3>
                  <p className="text-gray-600">Application des méthodes les plus efficaces : gel, pulvérisation, appâts ou traitement thermique selon les insectes et l'environnement.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-centers justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Prévention & conseils</h3>
                  <p className="text-gray-600">Mesures préventives pour éviter la réinfestation. Formation aux bonnes pratiques et mise en place de monitoring si nécessaire.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="section-padding bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-12">Prévention des réinfestations</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-blue-800">
                  Nos recommandations préventives
                </h3>
                <div className="space-y-4">
                  {prevention.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-blue-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield size={20} className="mr-2 text-green-600" />
                  Contrat de maintenance
                </h4>
                <p className="text-gray-600 mb-4">
                  Pour les professionnels, nous proposons des contrats de maintenance 
                  avec visites régulières et interventions préventives.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Inspections trimestrielles</li>
                  <li>• Traitement préventif inclus</li>
                  <li>• Rapport de conformité HACCP</li>
                  <li>• Interventions d'urgence prioritaires</li>
                </ul>
                <div className="mt-6">
                  <Link to="/secteurs-pro" className="btn-primary text-sm">
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white section-padding">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Problème d'insectes ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Solution rapide et efficace - Devis gratuit sur site
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+33142010707" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Phone size={20} />
              Appelle maintenant
            </a>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center gap-2">
              <FileText size={20} />
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesinsectisationParis;