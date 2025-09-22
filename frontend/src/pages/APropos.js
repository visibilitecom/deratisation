import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, Shield, Award, Users, CheckCircle, Target, Heart } from 'lucide-react';

const APropos = () => {
  const values = [
    {
      icon: <Target size={32} className="text-green-600" />,
      title: 'Efficacité',
      description: 'Résultats durables avec des méthodes éprouvées et des produits professionnels homologués.'
    },
    {
      icon: <Heart size={32} className="text-red-500" />,
      title: 'Respect',
      description: 'Respect de ton environnement, de ta famille et de tes contraintes professionnelles.'
    },
    {
      icon: <Shield size={32} className="text-blue-600" />,
      title: 'Sécurité',
      description: 'Sécurité maximale dans nos interventions, produits certifiés et équipes formées.'
    },
    {
      icon: <Users size={32} className="text-purple-600" />,
      title: 'Proximité',
      description: 'Relation de confiance, conseils personnalisés et suivi attentif de nos clients.'
    }
  ];

  const certifications = [
    {
      name: 'Agrément biocides',
      description: 'Autorisation officielle pour l\'utilisation de produits professionnels',
      number: 'N° [à compléter]'
    },
    {
      name: 'Assurance RC Pro',
      description: 'Couverture complète responsabilité civile professionnelle',
      montant: 'Jusqu\'à 500 000€'
    },
    {
      name: 'Formation continue',
      description: 'Mise à jour régulière des connaissances et techniques',
      frequency: 'Annuelle'
    },
    {
      name: 'Conformité HACCP',
      description: 'Respect des normes d\'hygiène alimentaire',
      scope: 'Tous secteurs'
    }
  ];

  const methods = [
    'Lutte intégrée (IPM) privilégiée',
    'Produits écoresponsables quand possible',
    'Techniques de prévention avancées',
    'Monitoring et suivi personnalisé',
    'Formation et sensibilisation clients'
  ];

  const team = [
    {
      role: 'Techniciens certifiés',
      description: 'Formation spécialisée en désinsectisation, dératisation et punaises de lit',
      count: '3 techniciens'
    },
    {
      role: 'Support client',
      description: 'Accueil téléphonique, planification et suivi personnalisé',
      count: 'Disponible 7j/7'
    },
    {
      role: 'Expertise technique',
      description: 'Veille réglementaire et amélioration continue des méthodes',
      count: 'Formation permanente'
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
            <span className="text-gray-600">À propos</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-bg section-padding" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1589979034086-5885b60c8f59)'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center hero-content">
            <h1 className="section-title mb-6">
              À propos d'Acces Services
            </h1>
            <p className="section-subtitle">
              Entreprise spécialisée en dératisation, punaises de lit et désinsectisation. 
              Notre mission : protéger ta santé et ton environnement avec expertise et respect.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="trust-badge">
                <Award size={16} />
                Expertise certifiée
              </span>
              <span className="trust-badge">
                <Shield size={16} />
                Assurance pro
              </span>
              <span className="trust-badge">
                <Users size={16} />
                Équipe formée
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:0142010707" className="btn-primary text-lg px-8 py-4">
                <Phone size={20} />
                01 42 01 07 07
              </a>
              <Link to="/contact" className="btn-secondary text-lg px-8 py-4">
                <FileText size={20} />
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="section-title text-left mb-8">
                  Notre mission
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-700">
                    Acces Services est née d'une volonté simple : offrir des solutions efficaces 
                    et respectueuses contre les nuisibles, en mettant l'humain au centre de nos préoccupations.
                  </p>
                  <p className="text-gray-600">
                    Que tu sois un particulier confronté à des punaises de lit ou un professionnel 
                    devant respecter les normes HACCP, nous mettons notre expertise à ton service 
                    avec la même exigence de qualité.
                  </p>
                  <p className="text-gray-600">
                    Notre approche privilégie toujours la prévention et les méthodes douces, 
                    tout en garantissant une efficacité maximale quand l'éradication est nécessaire.
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6 text-green-800">
                  Pourquoi nous choisir ?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-700">Plus de 10 ans d'expérience terrain</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-700">Interventions 7j/7 y compris urgences</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-700">Méthodes respectueuses et efficaces</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-700">Tarifs transparents sans surprise</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-green-700">Suivi personnalisé et conseils</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos valeurs</h2>
            <p className="section-subtitle">
              Les principes qui guident chacune de nos interventions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="service-card text-center">
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-12">Nos méthodes</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">
                  🌱 Approche écoresponsable
                </h3>
                <div className="space-y-4">
                  {methods.map((method, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle size={18} className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-4">
                  Innovation et recherche
                </h4>
                <p className="text-sm text-blue-700 mb-4">
                  Nous suivons en permanence les évolutions techniques et réglementaires 
                  pour t'offrir les meilleures solutions disponibles.
                </p>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• Veille scientifique active</li>
                  <li>• Test de nouvelles technologies</li>
                  <li>• Partenariats fabricants</li>
                  <li>• Retour d'expérience terrain</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section-padding bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Certifications & assurances</h2>
            <p className="section-subtitle">
              Gages de qualité et de sérieux pour ta tranquillité d'esprit
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="service-card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Award size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{cert.name}</h3>
                    <p className="text-gray-600 mb-3">{cert.description}</p>
                    <div className="text-sm font-medium text-blue-600">
                      {cert.number && `Référence : ${cert.number}`}
                      {cert.montant && `Montant : ${cert.montant}`}
                      {cert.frequency && `Fréquence : ${cert.frequency}`}
                      {cert.scope && `Périmètre : ${cert.scope}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Notre équipe</h2>
            <p className="section-subtitle">
              Des professionnels formés et passionnés à ton service
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="service-card text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{member.role}</h3>
                <p className="text-gray-600 mb-4">{member.description}</p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-green-800">{member.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-12">Informations légales</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="service-card text-left">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Coordonnées</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Acces Services</strong><br />
                    21 rue Meynadier<br />
                    75019 Paris
                  </p>
                  <p className="text-gray-700">
                    <strong>Téléphone :</strong> 01 42 01 07 07
                  </p>
                  <p className="text-gray-700">
                    <strong>SIRET :</strong> 44463188100034
                  </p>
                </div>
              </div>
              
              <div className="service-card text-left">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Horaires</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Interventions :</strong> 7j/7
                  </p>
                  <p className="text-gray-700">
                    <strong>Accueil téléphonique :</strong><br />
                    Lundi - Vendredi : 8h - 19h<br />
                    Weekend : 9h - 17h
                  </p>
                  <p className="text-gray-700">
                    <strong>Urgences :</strong> 24h/24 possible
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
          <h2 className="text-3xl font-bold mb-4">Prêt à nous faire confiance ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contacte-nous pour un devis gratuit et des conseils personnalisés
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0142010707" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Phone size={20} />
              01 42 01 07 07
            </a>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center gap-2">
              <FileText size={20} />
              Nous écrire
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default APropos;