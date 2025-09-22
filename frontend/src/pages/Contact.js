import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    codePostal: '',
    typeProbleme: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation des champs obligatoires
    if (!formData.nom || !formData.telephone || !formData.typeProbleme) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    // Création du message email
    const subject = `Demande de devis - ${formData.typeProbleme}`;
    const body = `
Bonjour,

Je souhaite obtenir un devis pour :

Nom : ${formData.nom}
Téléphone : ${formData.telephone}
Code postal : ${formData.codePostal || 'Non précisé'}
Type de problème : ${formData.typeProbleme}

Message :
${formData.message || 'Aucun message supplémentaire'}

Merci de me recontacter rapidement.

Cordialement,
${formData.nom}
    `.trim();
    
    // Ouverture du client email avec les données
    const mailtoLink = `mailto:contact@3dassistance.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    // Redirection vers la page de remerciement avec paramètres
    setTimeout(() => {
      const params = new URLSearchParams({
        nom: formData.nom,
        type: formData.typeProbleme
      });
      navigate(`/merci?${params.toString()}`);
    }, 1000); // Délai pour que le mailto s'ouvre d'abord
  };

  const problemTypes = [
    'Dératisation rats Paris',
    'Dératisation souris Paris',
    'Punaises de lit Paris',
    'Cafards / Blattes Paris',
    'Fourmis Paris',
    'Guêpes / Frelons Paris',
    'Puces Paris',
    'Mites alimentaires Paris',
    'Autre insecte Paris',
    'Contrat professionnel Paris',
    'Devis dératisation général'
  ];

  const contactMethods = [
    {
      icon: <Phone size={24} className="text-green-600" />,
      title: 'Téléphone dératisation Paris',
      content: '+33 1 42 01 07 07',
      description: 'Lun-Ven: 8h-19h | Weekend: 9h-17h',
      action: 'tel:0142010707'
    },
    {
      icon: <MapPin size={24} className="text-blue-600" />,
      title: 'Adresse Acces Services Paris',
      content: '21 rue Meynadier, 75019 Paris',
      description: 'Dératisation dans toute l\'Île-de-France',
      action: null
    },
    {
      icon: <Clock size={24} className="text-purple-600" />,
      title: 'Horaires dératisation Paris',
      content: '7j/7 disponible',
      description: 'Urgences dératisation possibles 24h/24',
      action: null
    }
  ];

  // Données structurées pour la page contact
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Acces Services",
      "telephone": "+33142010707",
      "email": "contact@acces-services-paris.fr",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "21 rue Meynadier",
        "addressLocality": "Paris",
        "postalCode": "75019",
        "addressCountry": "FR"
      },
      "openingHours": "Mo-Fr 08:00-19:00, Sa-Su 09:00-17:00"
    }
  };

  // Breadcrumbs
  const breadcrumbs = [
    { name: 'Accueil', url: '/' },
    { name: 'Contact Dératisation Paris', url: '/contact' }
  ];

  return (
    <>
      <SEOHead
        title="Contact Dératisation Paris - Devis Gratuit | Acces Services"
        description="✆ Contact dératisation Paris : 01 42 01 07 07. Devis gratuit dératisation, punaises de lit, désinsectisation. Expert Paris et IDF. Urgence 7j/7."
        keywords="contact dératisation Paris, téléphone dératisation Paris, devis dératisation Paris, dératisation urgence Paris, contact punaises de lit Paris, expert dératisation Paris, dératisation 75019, contact désinsectisation Paris"
        canonicalUrl="/contact"
        breadcrumbs={breadcrumbs}
        structuredData={contactStructuredData}
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
                <span className="text-gray-600" itemProp="name">Contact Dératisation Paris</span>
                <meta itemProp="position" content="2" />
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="hero-bg section-padding" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1425421669292-0c3da3b8f529)'}}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center hero-content">
              <h1 className="section-title mb-6">
                Contact Dératisation Paris - Devis Gratuit
              </h1>
              <p className="section-subtitle">
                Expert dératisation Paris : devis gratuit et conseils personnalisés. Nous te recontactons 
                sous 2h ou intervention immédiate selon ton besoin de dératisation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:0142010707" className="btn-primary text-lg px-8 py-4">
                  <Phone size={20} />
                  01 42 01 07 07
                </a>
                <a href="#contact-form" className="btn-secondary text-lg px-8 py-4">
                  <Mail size={20} />
                  Formulaire ci-dessous
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="section-padding bg-white" itemScope itemType="https://schema.org/LocalBusiness">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="section-title">Contact Expert Dératisation Paris</h2>
              <p className="section-subtitle">Plusieurs moyens pour nous contacter selon ton urgence de dératisation</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <div key={index} className="service-card text-center">
                  <div className="mb-6">{method.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{method.title}</h3>
                  <div className="mb-4">
                    {method.action ? (
                      <a href={method.action} className="text-lg font-medium text-green-600 hover:underline" itemProp="telephone">
                        {method.content}
                      </a>
                    ) : (
                      <p className="text-lg font-medium text-gray-900" itemProp="address">{method.content}</p>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="section-padding bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="section-title">Devis Dératisation Express Paris</h2>
                <p className="section-subtitle">
                  Remplis ce formulaire, notre expert dératisation Paris te recontacte sous 2h avec une estimation
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Form */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="nom"
                          name="nom"
                          required
                          value={formData.nom}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Ton nom et prénom"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          id="telephone"
                          name="telephone"
                          required
                          value={formData.telephone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="codePostal" className="block text-sm font-medium text-gray-700 mb-2">
                          Code postal Paris/IDF *
                        </label>
                        <input
                          type="text"
                          id="codePostal"
                          name="codePostal"
                          required
                          value={formData.codePostal}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="75001, 92, 93, 94..."
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="typeProbleme" className="block text-sm font-medium text-gray-700 mb-2">
                          Type de problème dératisation *
                        </label>
                        <select
                          id="typeProbleme"
                          name="typeProbleme"
                          required
                          value={formData.typeProbleme}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Sélectionne ton problème</option>
                          {problemTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Détails dératisation
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Décris ton problème dératisation (surface, depuis quand, urgence, rats/souris...)"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full btn-primary justify-center py-4"
                      >
                        <Send size={20} />
                        Demande devis dératisation Paris
                      </button>
                      
                      <p className="text-xs text-gray-500 text-center">
                        En soumettant ce formulaire, tu acceptes d'être recontacté par Acces Services 
                        pour répondre à ta demande de dératisation. Tes données ne seront pas transmises à des tiers.
                      </p>
                    </form>
                  ) : (
                    <div className="text-center py-12">
                      <CheckCircle size={64} className="text-green-600 mx-auto mb-6" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Email envoyé avec succès !
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Votre client email s'est ouvert avec votre demande pré-remplie. 
                        Envoyez-le pour recevoir votre devis gratuit sous 2h !
                      </p>
                      <p className="text-sm text-green-600 font-medium">
                        📧 Destinataire : contact@3dassistance.fr
                      </p>
                      <p className="text-sm text-green-600 mt-2">
                        Urgence ? Appelle directement le 01 42 01 07 07
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Info Panel */}
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4">
                      ⚡ Urgence dératisation Paris ?
                    </h3>
                    <p className="text-blue-700 mb-4">
                      Pour les situations critiques de dératisation (rats, souris, guêpes, infestation massive), 
                      appelle directement pour une intervention sous 2h à Paris.
                    </p>
                    <a href="tel:0142010707" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                      <Phone size={16} />
                      Dératisation urgence Paris
                    </a>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">
                      ✅ Devis dératisation inclus
                    </h3>
                    <ul className="text-green-700 space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                        Diagnostic dératisation gratuit sur place
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                        Devis dératisation détaillé sans engagement
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                        Conseils dératisation personnalisés inclus
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                        Rappel expert dératisation sous 2h garanti
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                      📋 Infos utiles dératisation
                    </h3>
                    <ul className="text-yellow-700 space-y-1 text-sm">
                      <li>• Type de logement Paris (maison, appartement, local)</li>
                      <li>• Surface approximative à traiter</li>
                      <li>• Depuis combien de temps (rats/souris)</li>
                      <li>• Présence d'enfants ou d'animaux</li>
                      <li>• Urgence de l'intervention dératisation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="bg-red-600 text-white section-padding">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Situation urgence dératisation Paris ?</h2>
            <p className="text-lg mb-6 opacity-90">
              Rats près des enfants, souris dans cuisine, infestation massive : dératisation immédiate possible à Paris
            </p>
            <a href="tel:0142010707" className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Phone size={20} />
              Dératisation urgence Paris : 01 42 01 07 07
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;