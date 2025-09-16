import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, Shield, CheckCircle, ClipboardCheck, Building, Calendar } from 'lucide-react';

const SecteursPro = () => {
  const sectors = [
    {
      name: 'Restaurants & Brasseries',
      description: 'Conformité HACCP, interventions discrètes hors service',
      icon: '🍽️',
      risks: 'Fermeture administrative, perte de clientèle',
      frequency: 'Mensuel ou trimestriel'
    },
    {
      name: 'Boulangeries & Pâtisseries',
      description: 'Traitement adapté aux denrées alimentaires sensibles',
      icon: '🥖',
      risks: 'Contamination des produits, normes sanitaires',
      frequency: 'Bimensuel recommandé'
    },
    {
      name: 'Hôtels & Hébergements',
      description: 'Interventions discrètes, protection de la réputation',
      icon: '🏨',
      risks: 'Avis clients négatifs, litiges',
      frequency: 'Trimestriel + urgences'
    },
    {
      name: 'Magasins Alimentaires',
      description: 'Respect des normes IFS, BRC et autres référentiels',
      icon: '🛒',
      risks: 'Sanctions sanitaires, retrait produits',
      frequency: 'Mensuel obligatoire'
    },
    {
      name: 'Bureaux & Coworkings',
      description: 'Bien-être des salariés, image de l\'entreprise',
      icon: '🏢',
      risks: 'Inconfort, arrêts de travail',
      frequency: 'Semestriel ou à la demande'
    },
    {
      name: 'Syndics & Copropriétés',
      description: 'Gestion des parties communes et caves',
      icon: '🏘️',
      risks: 'Propagation, responsabilité syndic',
      frequency: 'Annuel ou selon besoins'
    }
  ];

  const services = [
    {
      title: 'Plan de maîtrise sanitaire',
      description: 'Document obligatoire recensant tous les risques et mesures préventives',
      included: ['Analyse des dangers', 'Points critiques', 'Mesures correctives', 'Vérifications']
    },
    {
      title: 'Registre d\'interventions',
      description: 'Traçabilité complète pour les contrôles sanitaires officiels',
      included: ['Dates d\'intervention', 'Produits utilisés', 'Plans des dispositifs', 'Recommandations']
    },
    {
      title: 'Contrats de maintenance',
      description: 'Visites préventives régulières pour anticiper les problèmes',
      included: ['Inspections programmées', 'Rapports détaillés', 'Interventions d\'urgence', 'Formation du personnel']
    },
    {
      title: 'Conformité HACCP',
      description: 'Respect des 7 principes HACCP et des réglementations en vigueur',
      included: ['Audit initial', 'Mise en conformité', 'Suivi continu', 'Certification']
    }
  ];

  const obligations = [
    'Art. L233-4 du Code rural : obligation de lutte',
    'Règlement CE 852/2004 : hygiène des denrées',
    'Arrêté du 9 mai 1995 : lutte contre nuisibles',
    'Norme HACCP : analyse des dangers biologiques'
  ];

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link to="/" className="text-green-600 hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Secteurs Professionnels</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-blue-50 section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="section-title mb-6">
              Solutions Professionnelles
            </h1>
            <p className="section-subtitle">
              Conformité HACCP, traçabilité complète et interventions adaptées 
              à ton secteur d'activité. Devis sur mesure.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="trust-badge">
                <Shield size={16} />
                Conforme HACCP
              </span>
              <span className="trust-badge">
                <ClipboardCheck size={16} />
                Traçabilité complète
              </span>
              <span className="trust-badge">
                <Calendar size={16} />
                Contrats maintenance
              </span>
              <span className="trust-badge">
                <Building size={16} />
                Tous secteurs
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+33142010707" className="btn-primary text-lg px-8 py-4">
                <Phone size={20} />
                Urgence professionnelle
              </a>
              <a href="#contact-form" className="btn-secondary text-lg px-8 py-4">
                <FileText size={20} />
                Devis sur mesure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos secteurs d'expertise</h2>
            <p className="section-subtitle">Chaque activité a ses spécificités, nous les connaissons</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <div key={index} className="service-card">
                <div className="text-4xl mb-4 text-center">{sector.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">{sector.name}</h3>
                <p className="text-gray-600 mb-4">{sector.description}</p>
                
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Risques :</strong> {sector.risks}
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Fréquence :</strong> {sector.frequency}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos services professionnels</h2>
            <p className="section-subtitle">
              Tout ce dont tu as besoin pour être en conformité
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 mb-3">Inclus :</h4>
                  {service.included.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-3">
                      <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-12">Obligations légales</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-red-800">
                  ⚖️ Ce que dit la loi
                </h3>
                <div className="space-y-4">
                  {obligations.map((obligation, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Shield size={18} className="text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-red-700 text-sm">{obligation}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Important :</strong> Le défaut de plan de lutte peut entraîner 
                    des sanctions administratives jusqu'à la fermeture temporaire.
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 p-8 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-4 flex items-center">
                  <CheckCircle size={20} className="mr-2" />
                  Notre engagement conformité
                </h4>
                <ul className="text-sm text-green-700 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle size={14} className="mr-2 flex-shrink-0" />
                    Respect des réglementations en vigueur
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={14} className="mr-2 flex-shrink-0" />
                    Documentation complète et traçable
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={14} className="mr-2 flex-shrink-0" />
                    Produits homologués et certificats fournis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={14} className="mr-2 flex-shrink-0" />
                    Formation du personnel incluse
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={14} className="mr-2 flex-shrink-0" />
                    Support lors des contrôles officiels
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-12">Comment ça marche ?</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  1
                </div>
                <h3 className="font-semibold mb-2">Audit gratuit</h3>
                <p className="text-sm text-gray-600">Diagnostic de tes locaux et évaluation des risques</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  2
                </div>
                <h3 className="font-semibold mb-2">Devis personnalisé</h3>
                <p className="text-sm text-gray-600">Proposition adaptée à ton activité et budget</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  3
                </div>
                <h3 className="font-semibold mb-2">Intervention</h3>
                <p className="text-sm text-gray-600">Traitement professionnel et mise en conformité</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  4
                </div>
                <h3 className="font-semibold mb-2">Suivi & maintenance</h3>
                <p className="text-sm text-gray-600">Contrôles réguliers et documentation continue</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white section-padding">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'une solution professionnelle ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Audit gratuit et devis personnalisé sous 24h
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+33142010707" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Phone size={20} />
              Urgence pro
            </a>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center gap-2">
              <FileText size={20} />
              Demander un audit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecteursPro;