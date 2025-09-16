import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
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
    // Simulation d'envoi - en réalité ce serait un mailto ou une API
    console.log('Formulaire soumis:', formData);
    setIsSubmitted(true);
    
    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        nom: '',
        telephone: '',
        codePostal: '',
        typeProbleme: '',
        message: ''
      });
    }, 3000);
  };

  const problemTypes = [
    'Rats ou souris',
    'Punaises de lit',
    'Cafards / Blattes',
    'Fourmis',
    'Guêpes / Frelons',
    'Puces',
    'Mites alimentaires',
    'Autre insecte',
    'Contrat professionnel',
    'Devis général'
  ];

  const contactMethods = [
    {
      icon: <Phone size={24} className="text-green-600" />,
      title: 'Téléphone',
      content: '+33 1 42 01 07 07',
      description: 'Lun-Ven: 8h-19h | Weekend: 9h-17h',
      action: 'tel:+33142010707'
    },
    {
      icon: <MapPin size={24} className="text-blue-600" />,
      title: 'Adresse',
      content: '21 rue Meynadier, 75019 Paris',
      description: 'Interventions dans toute l\'Île-de-France',
      action: null
    },
    {
      icon: <Clock size={24} className="text-purple-600" />,
      title: 'Horaires interventions',
      content: '7j/7 disponible',
      description: 'Urgences possibles 24h/24',
      action: null
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
            <span className="text-gray-600">Contact</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-bg section-padding" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1425421669292-0c3da3b8f529)'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center hero-content">
            <h1 className="section-title mb-6">
              Contacte-nous
            </h1>
            <p className="section-subtitle">
              Devis gratuit et conseils personnalisés. Nous te recontactons 
              sous 2h ou intervention immédiate selon ton besoin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+33142010707" className="btn-primary text-lg px-8 py-4">
                <Phone size={20} />
                Appel immédiat
              </a>
              <a href="#contact-form" className="btn-secondary text-lg px-8 py-4">
                <Mail size={20} />
                Formulaire rapide
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Comment nous joindre ?</h2>
            <p className="section-subtitle">Plusieurs moyens pour nous contacter selon ton urgence</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="service-card text-center">
                <div className="mb-6">{method.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{method.title}</h3>
                <div className="mb-4">
                  {method.action ? (
                    <a href={method.action} className="text-lg font-medium text-green-600 hover:underline">
                      {method.content}
                    </a>
                  ) : (
                    <p className="text-lg font-medium text-gray-900">{method.content}</p>
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
              <h2 className="section-title">Demande de devis express</h2>
              <p className="section-subtitle">
                Remplis ce formulaire, nous te recontactons sous 2h avec une estimation
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
                        Code postal *
                      </label>
                      <input
                        type="text"
                        id="codePostal"
                        name="codePostal"
                        required
                        value={formData.codePostal}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="75001"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="typeProbleme" className="block text-sm font-medium text-gray-700 mb-2">
                        Type de problème *
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
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Décris ton problème en quelques mots (surface, depuis quand, urgence...)"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full btn-primary justify-center py-4"
                    >
                      <Send size={20} />
                      Envoyer ma demande
                    </button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      En soumettant ce formulaire, tu acceptes d'être recontacté par Acces Services 
                      pour répondre à ta demande. Tes données ne seront pas transmises à des tiers.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle size={64} className="text-green-600 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Demande envoyée !
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Merci pour ta demande. Nous te recontactons sous 2h 
                      avec une estimation personnalisée.
                    </p>
                    <p className="text-sm text-green-600">
                      En cas d'urgence, appelle directement le +33 1 42 01 07 07
                    </p>
                  </div>
                )}
              </div>
              
              {/* Info Panel */}
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    ⚡ Urgence immédiate ?
                  </h3>
                  <p className="text-blue-700 mb-4">
                    Pour les situations critiques (guêpes, allergie, punaises massives), 
                    appelle directement pour une intervention sous 2h.
                  </p>
                  <a href="tel:+33142010707" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                    <Phone size={16} />
                    Appel d'urgence
                  </a>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">
                    ✅ Ce qui est inclus
                  </h3>
                  <ul className="text-green-700 space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                      Diagnostic gratuit sur place
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                      Devis détaillé sans engagement
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                      Conseils personnalisés inclus
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                      Rappel sous 2h garanti
                    </li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                    📋 Prépare ces infos
                  </h3>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Type de logement (maison, appartement, local)</li>
                    <li>• Surface approximative concernée</li>
                    <li>• Depuis combien de temps le problème existe</li>
                    <li>• Présence d'enfants ou d'animaux</li>
                    <li>• Urgence de l'intervention</li>
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
          <h2 className="text-2xl font-bold mb-4">Situation d'urgence ?</h2>
          <p className="text-lg mb-6 opacity-90">
            Guêpes près des enfants, allergie, infestation massive : intervention immédiate possible
          </p>
          <a href="tel:+33142010707" className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
            <Phone size={20} />
            Urgence : +33 1 42 01 07 07
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;