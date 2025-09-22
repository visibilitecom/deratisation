import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, MapPin, Clock, Car } from 'lucide-react';

const ZonesIntervention = () => {
  const parisZones = [
    { arrond: '1er', name: 'Louvre', landmarks: 'Châtelet, Rivoli' },
    { arrond: '2e', name: 'Bourse', landmarks: 'Grands Boulevards, Sentier' },
    { arrond: '3e', name: 'Temple', landmarks: 'Marais, République' },
    { arrond: '4e', name: 'Hôtel-de-Ville', landmarks: 'Notre-Dame, Bastille' },
    { arrond: '5e', name: 'Panthéon', landmarks: 'Quartier Latin, Sorbonne' },
    { arrond: '6e', name: 'Luxembourg', landmarks: 'Saint-Germain, Odéon' },
    { arrond: '7e', name: 'Palais-Bourbon', landmarks: 'Tour Eiffel, Invalides' },
    { arrond: '8e', name: 'Élysée', landmarks: 'Champs-Élysées, Opéra' },
    { arrond: '9e', name: 'Opéra', landmarks: 'Pigalle, Grands Magasins' },
    { arrond: '10e', name: 'Entrepôt', landmarks: 'Gare du Nord, Canal' },
    { arrond: '11e', name: 'Popincourt', landmarks: 'Bastille, République' },
    { arrond: '12e', name: 'Reuilly', landmarks: 'Bercy, Vincennes' },
    { arrond: '13e', name: 'Gobelins', landmarks: 'Bibliothèque, Italie' },
    { arrond: '14e', name: 'Observatoire', landmarks: 'Montparnasse, Alésia' },
    { arrond: '15e', name: 'Vaugirard', landmarks: 'Tour Montparnasse, Beaugrenelle' },
    { arrond: '16e', name: 'Passy', landmarks: 'Trocadéro, Bois de Boulogne' },
    { arrond: '17e', name: 'Batignolles-Monceau', landmarks: 'Arc de Triomphe, Parc Monceau' },
    { arrond: '18e', name: 'Butte-Montmartre', landmarks: 'Montmartre, Sacré-Cœur' },
    { arrond: '19e', name: 'Buttes-Chaumont', landmarks: 'Parc des Buttes-Chaumont, Villette' },
    { arrond: '20e', name: 'Ménilmontant', landmarks: 'Père Lachaise, Belleville' }
  ];

  const departments = [
    {
      code: '77',
      name: 'Seine-et-Marne',
      mainCities: [
        'Meaux', 'Melun', 'Chelles', 'Pontault-Combault', 'Savigny-le-Temple',
        'Champs-sur-Marne', 'Villeparisis', 'Roissy-en-Brie', 'Combs-la-Ville', 'Torcy'
      ]
    },
    {
      code: '78',
      name: 'Yvelines',
      mainCities: [
        'Versailles', 'Sartrouville', 'Mantes-la-Jolie', 'Saint-Germain-en-Laye', 'Poissy',
        'Conflans-Sainte-Honorine', 'Les Mureaux', 'Plaisir', 'Chatou', 'Houilles'
      ]
    },
    {
      code: '91',
      name: 'Essonne',
      mainCities: [
        'Évry-Courcouronnes', 'Corbeil-Essonnes', 'Massy', 'Savigny-sur-Orge', 'Sainte-Geneviève-des-Bois',
        'Viry-Châtillon', 'Athis-Mons', 'Palaiseau', 'Draveil', 'Yerres'
      ]
    },
    {
      code: '92',
      name: 'Hauts-de-Seine',
      mainCities: [
        'Boulogne-Billancourt', 'Nanterre', 'Courbevoie', 'Asnières-sur-Seine', 'Colombes',
        'Rueil-Malmaison', 'Neuilly-sur-Seine', 'Levallois-Perret', 'Clichy', 'Issy-les-Moulineaux'
      ]
    },
    {
      code: '93',
      name: 'Seine-Saint-Denis',
      mainCities: [
        'Saint-Denis', 'Montreuil', 'Noisy-le-Grand', 'Pantin', 'Aulnay-sous-Bois',
        'Drancy', 'Aubervilliers', 'Champigny-sur-Marne', 'Épinay-sur-Seine', 'Rosny-sous-Bois'
      ]
    },
    {
      code: '94',
      name: 'Val-de-Marne',
      mainCities: [
        'Créteil', 'Vitry-sur-Seine', 'Champigny-sur-Marne', 'Saint-Maur-des-Fossés', 'Ivry-sur-Seine',
        'Vincennes', 'Fontenay-sous-Bois', 'Nogent-sur-Marne', 'Villejuif', 'Cachan'
      ]
    },
    {
      code: '95',
      name: 'Val-d\'Oise',
      mainCities: [
        'Cergy', 'Argenteuil', 'Sarcelles', 'Franconville', 'Ermont',
        'Pontoise', 'Goussainville', 'Bezons', 'Garges-lès-Gonesse', 'Villiers-le-Bel'
      ]
    }
  ];

  const interventionTimes = [
    { zone: 'Paris centre (1er-4e)', time: '30-45 min', availability: 'Immédiate' },
    { zone: 'Paris est/ouest (5e-12e, 15e-20e)', time: '45-60 min', availability: 'Sous 2h' },
    { zone: 'Petite couronne (92, 93, 94)', time: '60-90 min', availability: 'Sous 4h' },
    { zone: 'Grande couronne (77, 78, 91, 95)', time: '90-120 min', availability: 'Même jour' }
  ];

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link to="/" className="text-green-600 hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Zones d'intervention</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-bg section-padding" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6952)'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center hero-content">
            <h1 className="section-title mb-6">
              Zones d'intervention Paris & Île-de-France
            </h1>
            <p className="section-subtitle">
              Interventions rapides dans tous les arrondissements de Paris 
              et les 7 départements de l'Île-de-France.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="trust-badge">
                <MapPin size={16} />
                Paris 1er au 20e
              </span>
              <span className="trust-badge">
                <Car size={16} />
                Déplacement rapide
              </span>
              <span className="trust-badge">
                <Clock size={16} />
                7j/7 disponible
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+33142010707" className="btn-primary text-lg px-8 py-4">
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

      {/* Paris Zones */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Paris - Tous arrondissements</h2>
            <p className="section-subtitle">
              Couverture complète de Paris, intervention sous 1h
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {parisZones.map((zone, index) => (
              <div key={index} className="bg-green-50 p-4 rounded-lg border hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <MapPin size={16} className="text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Paris {zone.arrond}</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{zone.name}</h4>
                <p className="text-sm text-gray-600">{zone.landmarks}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-green-600 text-white p-6 rounded-lg inline-block">
              <Clock size={24} className="mx-auto mb-4" />
              <p className="font-semibold mb-2">Temps d'intervention Paris</p>
              <p className="text-lg">30 à 60 minutes maximum</p>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Île-de-France - 7 départements</h2>
            <p className="section-subtitle">
              Couverture étendue en petite et grande couronne
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="service-card">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    {dept.code}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-600">Département {dept.code}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 mb-3">Principales villes couvertes :</h4>
                  <div className="flex flex-wrap gap-2">
                    {dept.mainCities.map((city, cityIndex) => (
                      <span key={cityIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intervention Times */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Temps d'intervention</h2>
            <p className="section-subtitle">
              Délais d'arrivée selon ta localisation
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {interventionTimes.map((item, index) => (
                <div key={index} className="service-card">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.zone}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Temps de trajet :</span>
                          <span className="font-medium text-green-600">{item.time}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Disponibilité :</span>
                          <span className="font-medium text-blue-600">{item.availability}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Special Cases */}
      <section className="section-padding bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-12">Cas particuliers</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-4">🚨</div>
                <h3 className="font-semibold text-red-800 mb-3">Urgences</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Situations critiques : guêpes, allergie, punaises de lit, contamination alimentaire
                </p>
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-sm text-red-700 font-medium">
                    Intervention sous 2h même le weekend
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-4">🌙</div>
                <h3 className="font-semibold text-blue-800 mb-3">Interventions nocturnes</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Restaurants, hôtels, commerces : interventions possibles hors heures d'ouverture
                </p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-blue-700 font-medium">
                    Surcoût minime appliqué
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl mb-4">🚛</div>
                <h3 className="font-semibold text-green-800 mb-3">Zones étendues</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Au-delà de l'Île-de-France : nous consulter pour faisabilité et tarifs
                </p>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-green-700 font-medium">
                    Devis personnalisé selon distance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white section-padding">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ta zone est couverte ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Appelle-nous pour confirmation et intervention rapide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+33142010707" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Phone size={20} />
              Vérifier ma zone
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

export default ZonesIntervention;