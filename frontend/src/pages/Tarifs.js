import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, Euro, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const Tarifs = () => {
  const servicePrices = [
    {
      service: 'Dératisation',
      particulier: '120€ - 180€',
      professionnel: '150€ - 300€',
      details: 'Selon surface et niveau d\'infestation',
      included: ['Diagnostic gratuit', 'Appâts sécurisés', 'Suivi 1 mois', 'Rapport d\'intervention']
    },
    {
      service: 'Punaises de lit',
      particulier: '180€ - 280€',
      professionnel: '250€ - 450€',
      details: '2 passages inclus, garantie résultat',
      included: ['Inspection complète', '2 traitements', 'Conseils préparation', 'Garantie 3 mois']
    },
    {
      service: 'Désinsectisation',
      particulier: '100€ - 150€',
      professionnel: '120€ - 250€',
      details: 'Cafards, fourmis, puces, mites',
      included: ['Identification espèces', 'Traitement ciblé', 'Conseils prévention', 'Suivi inclus']
    },
    {
      service: 'Guêpes / Frelons',
      particulier: '80€ - 120€',
      professionnel: '100€ - 180€',
      details: 'Destruction nid, équipement sécurité',
      included: ['Équipement protection', 'Destruction nid', 'Sécurisation zone', 'Nettoyage inclus']
    }
  ];

  const contractTypes = [
    {
      type: 'Contrat Annuel Restaurant',
      description: 'Visites trimestrielles + urgences',
      price: '800€ - 1500€/an',
      features: ['4 visites programmées', 'Interventions d\'urgence illimitées', 'Rapport HACCP', 'Formation équipe']
    },
    {
      type: 'Contrat Annuel Bureau',
      description: 'Prévention et traitement',
      price: '400€ - 800€/an',
      features: ['2 visites programmées', 'Monitoring permanent', 'Interventions incluses', 'Conseils personnalisés']
    },
    {
      type: 'Contrat Syndic',  
      description: 'Parties communes et caves',
      price: '300€ - 600€/an',
      features: ['Inspection régulière', 'Traitement préventif', 'Rapport aux copropriétaires', 'Urgences incluses']
    }
  ];

  const additionalCosts = [
    { item: 'Déplacement urgence weekend', cost: '+30€' },
    { item: 'Intervention nocturne (20h-6h)', cost: '+50€' },
    { item: 'Traitement grande surface (+200m²)', cost: '+0,5€/m²' },
    { item: 'Rapport détaillé supplémentaire', cost: '+25€' },
    { item: 'Formation personnalisée équipe', cost: '+100€' }
  ];

  const paymentMethods = [
    'Espèces (sur place)',
    'Chèque à l\'ordre d\'Acces Services',
    'Virement bancaire (professionnels)',
    'Carte bancaire (TPE disponible)'
  ];

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link to="/" className="text-green-600 hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Tarifs</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-bg section-padding" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1425421669292-0c3da3b8f529)'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center hero-content">
            <h1 className="section-title mb-6">
              Tarifs transparents et justes
            </h1>
            <p className="section-subtitle">
              Fourchettes indicatives sans engagement. Devis gratuit et personnalisé 
              selon ton problème et ta situation.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="trust-badge">
                <Euro size={16} />
                Devis gratuit
              </span>
              <span className="trust-badge">
                <CheckCircle size={16} />
                Pas de surcoût caché
              </span>
              <span className="trust-badge">
                <FileText size={16} />
                Facture fournie
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:0142010707" className="btn-primary text-lg px-8 py-4">
                <Phone size={20} />
                01 42 01 07 07
              </a>
              <a href="https://www.3dassistance.fr/contact" target="_blank" rel="noopener noreferrer" className="btn-secondary text-lg px-8 py-4">
                <FileText size={20} />
                Devis immédiat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Prices */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Tarifs par service</h2>
            <p className="section-subtitle">
              Fourchettes indicatives - Le prix final dépend de nombreux facteurs
            </p>
          </div>
          
          <div className="space-y-8">
            {servicePrices.map((item, index) => (
              <div key={index} className="service-card">
                <div className="grid lg:grid-cols-4 gap-6 items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.service}</h3>
                    <p className="text-sm text-gray-600">{item.details}</p>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-medium text-gray-900 mb-2">Particuliers</h4>
                    <div className="text-lg font-bold text-green-600">{item.particulier}</div>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-medium text-gray-900 mb-2">Professionnels</h4>
                    <div className="text-lg font-bold text-blue-600">{item.professionnel}</div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Inclus :</h4>
                    <div className="space-y-1">
                      {item.included.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
            <div className="flex items-start">
              <Info size={20} className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-800 mb-2">Facteurs influençant le prix</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Surface des locaux à traiter</li>
                  <li>• Niveau et étendue de l'infestation</li>
                  <li>• Accessibilité des zones concernées</li>
                  <li>• Contraintes particulières (alimentaire, enfants, animaux)</li>
                  <li>• Urgence de l'intervention</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Contracts */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Contrats professionnels</h2>
            <p className="section-subtitle">
              Solutions sur mesure pour un suivi régulier et une tranquillité d'esprit
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {contractTypes.map((contract, index) => (
              <div key={index} className="service-card text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{contract.type}</h3>
                <p className="text-gray-600 mb-4">{contract.description}</p>
                <div className="text-2xl font-bold text-blue-600 mb-6">{contract.price}</div>
                
                <div className="space-y-3 text-left">
                  {contract.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <CheckCircle size={16} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link to="/secteurs-pro" className="btn-secondary text-sm">
                    En savoir plus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Costs */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Suppléments éventuels</h2>
              <p className="section-subtitle">
                Transparence totale sur les coûts additionnels possibles
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="service-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Suppléments tarifaires</h3>
                <div className="space-y-4">
                  {additionalCosts.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700 text-sm">{item.item}</span>
                      <span className="font-medium text-red-600">{item.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="service-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Moyens de paiement</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{method}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Facturation</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Facture remise sur place ou envoyée</li>
                    <li>• Attestation d'intervention fournie</li>
                    <li>• Possibilité d'échelonnement (pros)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="section-padding bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-12">Nos garanties tarifaires</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Euro size={32} className="text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-3">Devis gratuit</h3>
                <p className="text-sm text-gray-600">
                  Diagnostic et estimation sans engagement. Tu paies seulement si tu acceptes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <CheckCircle size={32} className="text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-3">Prix fixe annoncé</h3>
                <p className="text-sm text-gray-600">
                  Le prix convenu ne change pas. Aucune surprise à la fin de l'intervention.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <FileText size={32} className="text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-3">Satisfaction garantie</h3>
                <p className="text-sm text-gray-600">
                  Si le résultat ne correspond pas, nous revenons gratuitement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white section-padding">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'un devis précis ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Appelle-nous pour une estimation gratuite et personnalisée
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0142010707" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Phone size={20} />
              01 42 01 07 07
            </a>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center gap-2">
              <FileText size={20} />
              Formulaire de contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tarifs;