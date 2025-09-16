import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, Shield, Clock, CheckCircle, Star, MapPin } from 'lucide-react';

const Home = () => {
  const services = [
    {
      title: 'Dératisation',
      description: 'Élimination efficace des rats et souris avec méthodes professionnelles',
      link: '/deratisation-paris',
      icon: '🐭'
    },
    {
      title: 'Punaises de lit',
      description: 'Traitement complet et garanti contre les punaises de lit',
      link: '/punaises-de-lit-paris',
      icon: '🛏️'
    },
    {
      title: 'Désinsectisation',
      description: 'Traitement des cafards, fourmis, puces et autres insectes',
      link: '/desinsectisation-paris',
      icon: '🪲'
    }
  ];

  const process = [
    {
      step: '1',
      title: 'Inspection gratuite',
      description: 'Diagnostic complet de la situation et identification du problème'
    },
    {
      step: '2',
      title: 'Traitement adapté',
      description: 'Application de méthodes professionnelles adaptées à ton cas'
    },
    {
      step: '3',
      title: 'Suivi & garantie',
      description: 'Contrôle post-traitement et garantie de résultat'
    }
  ];

  const testimonials = [
    {
      name: 'Marie L.',
      rating: 5,
      comment: 'Intervention rapide et efficace pour mes punaises de lit. Équipe professionnelle et discrète.',
      location: 'Paris 11e'
    },
    {
      name: 'Restaurant Le Bistrot',
      rating: 5,
      comment: 'Service régulier de dératisation. Très satisfait du suivi et de la traçabilité HACCP.',
      location: 'Paris 3e'
    },
    {
      name: 'Pierre M.',
      rating: 5,
      comment: 'Problème de cafards résolu définitivement. Prix honnête et conseils utiles.',
      location: 'Vincennes (94)'
    }
  ];

  const zones = [
    'Paris 1er', 'Paris 2e', 'Paris 3e', 'Paris 4e', 'Paris 5e', 'Paris 6e',
    'Paris 7e', 'Paris 8e', 'Paris 9e', 'Paris 10e', 'Paris 11e', 'Paris 12e',
    'Paris 13e', 'Paris 14e', 'Paris 15e', 'Paris 16e', 'Paris 17e', 'Paris 18e',
    'Paris 19e', 'Paris 20e', 'Seine-et-Marne (77)', 'Yvelines (78)', 'Essonne (91)',
    'Hauts-de-Seine (92)', 'Seine-Saint-Denis (93)', 'Val-de-Marne (94)', 'Val-d\'Oise (95)'
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="hero-bg section-padding" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7)'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center hero-content">
            <h1 className="section-title mb-6 fade-in-up">
              Dératisation & Punaises de lit à Paris et en Île-de-France
            </h1>
            <p className="section-subtitle fade-in-up">
              Interventions rapides et garanties pour professionnels et particuliers. 
              Devis gratuit et solutions adaptées à tes besoins.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 fade-in-up">
              <span className="trust-badge">
                <Clock size={16} />
                Interventions 7j/7
              </span>
              <span className="trust-badge">
                <Shield size={16} />
                Conforme HACCP
              </span>
              <span className="trust-badge">
                <CheckCircle size={16} />
                Traçabilité
              </span>
              <span className="trust-badge">
                <Star size={16} />
                Garantie de résultat*
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up">
              <a href="tel:+33142010707" className="btn-primary text-lg px-8 py-4">
                <Phone size={20} />
                Appelle-nous maintenant
              </a>
              <a href="#contact-form" className="btn-secondary text-lg px-8 py-4">
                <FileText size={20} />
                Demande ton devis express
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pour qui Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Pour qui ?</h2>
            <p className="section-subtitle">Nos solutions adaptées à tous</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="service-card text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Professionnels</h3>
              <p className="text-gray-600 mb-6">
                Restaurants, boulangeries, hôtels, bureaux, syndics... 
                Respect des normes HACCP et traçabilité complète.
              </p>
              <Link to="/secteurs-pro" className="btn-primary">
                Voir nos solutions pro
              </Link>
            </div>
            
            <div className="service-card text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Particuliers</h3>
              <p className="text-gray-600 mb-6">
                Maisons, appartements... Interventions discrètes, 
                sécurisées pour enfants et animaux.
              </p>
              <Link to="/particuliers" className="btn-primary">
                Solutions particuliers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos services</h2>
            <p className="section-subtitle">Expertise et efficacité garanties</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link to={service.link} className="btn-primary">
                  En savoir plus
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Notre processus en 3 étapes</h2>
            <p className="section-subtitle">Simple, efficace et garanti</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Ils nous font confiance</h2>
            <p className="section-subtitle">Témoignages de nos clients satisfaits</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="service-card">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{testimonial.name}</span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {testimonial.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Zones d'intervention</h2>
            <p className="section-subtitle">Paris et toute l'Île-de-France</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {zones.map((zone, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {zone}
                </span>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/zones-intervention" className="btn-secondary">
                Voir toutes nos zones
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-red-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Urgence 7j/7 ?</h2>
          <p className="mb-6">Intervention rapide pour situations critiques</p>
          <a href="tel:+33142010707" className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
            <Phone size={20} />
            Appelle immédiatement
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;