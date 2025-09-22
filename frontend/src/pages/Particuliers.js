import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, Shield, Heart, Home, Users, Clock } from 'lucide-react';

const Particuliers = () => {
  const problems = [
    {
      title: 'Rats et souris',
      description: 'Élimination rapide et discrète des rongeurs dans ton logement',
      icon: '🐭',
      urgency: 'Intervention rapide recommandée'
    },
    {
      title: 'Punaises de lit',
      description: 'Traitement complet en 2 passages, discrétion garantie',
      icon: '🛏️',
      urgency: 'Action immédiate nécessaire'
    },
    {
      title: 'Cafards et blattes',
      description: 'Éradication définitive avec gel professionnel',
      icon: '🪳',
      urgency: 'Traitement préventif recommandé'
    },
    {
      title: 'Fourmis',
      description: 'Traitement des colonies et prévention des réinfestations',
      icon: '🐜',
      urgency: 'Solution durable disponible'
    },
    {
      title: 'Guêpes et frelons',
      description: 'Destruction sécurisée des nids, protection de la famille',
      icon: '🐝',
      urgency: 'Danger - intervention d\'urgence'
    },
    {
      title: 'Mites et puces',
      description: 'Traitement environnemental complet et conseils',
      icon: '🦋',
      urgency: 'Traitement précoce efficace'
    }
  ];

  const guarantees = [
    {
      title: 'Sécurité famille',
      description: 'Produits sécurisés pour enfants et animaux domestiques',
      icon: <Heart size={24} className="text-red-500" />
    },
    {
      title: 'Discrétion totale',
      description: 'Interventions discrètes, respect de ta vie privée',
      icon: <Shield size={24} className="text-blue-500" />
    },
    {
      title: 'Prix transparent',
      description: 'Devis gratuit, pas de surcoût caché, facture claire',
      icon: <FileText size={24} className="text-green-500" />
    },
    {
      title: 'Disponibilité 7j/7',
      description: 'Urgences possibles le weekend et jours fériés',
      icon: <Clock size={24} className="text-purple-500" />
    }
  ];

  const preparation = [
    {
      category: 'Avant notre venue',
      items: [
        'Libère l\'accès aux zones concernées',
        'Éloigne les animaux domestiques',
        'Informe-nous des enfants en bas âge',
        'Signale les zones sensibles'
      ]
    },
    {
      category: 'Pendant l\'intervention',
      items: [
        'Sors du logement si demandé',
        'Laisse-nous travailler sereinement',
        'Pose tes questions à la fin',
        'Note bien nos conseils'
      ]
    },
    {
      category: 'Après le traitement',
      items: [
        'Respecte les délais de réintégration',
        'Aère bien les pièces traitées',
        'Suis nos recommandations',
        'Surveille l\'évolution'
      ]
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
            <span className="text-gray-600">Particuliers</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-bg section-padding" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7)'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center hero-content">
            <h1 className="section-title mb-6">
              Solutions pour Particuliers
            </h1>
            <p className="section-subtitle">
              Interventions discrètes et sécurisées dans ton logement. 
              Nous prenons soin de ta famille et de tes animaux.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="trust-badge">
                <Heart size={16} />
                Sécurisé enfants/animaux
              </span>
              <span className="trust-badge">
                <Shield size={16} />
                Discrétion garantie
              </span>
              <span className="trust-badge">
                <Home size={16} />
                Respect du logement
              </span>
              <span className="trust-badge">
                <Users size={16} />
                Conseils personnalisés
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

      {/* Problems Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Quel est ton problème ?</h2>
            <p className="section-subtitle">Solutions adaptées à chaque situation dans ton logement</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div key={index} className="service-card text-center">
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{problem.title}</h3>
                <p className="text-gray-600 mb-4">{problem.description}</p>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">
                    💡 {problem.urgency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos garanties particuliers</h2>
            <p className="section-subtitle">
              Parce que ton foyer mérite le meilleur
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="service-card text-center">
                <div className="mb-4">{guarantee.icon}</div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">{guarantee.title}</h3>
                <p className="text-gray-600 text-sm">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Que préparer ?</h2>
            <p className="section-subtitle">Guide simple pour une intervention optimale</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {preparation.map((phase, index) => (
              <div key={index} className="service-card">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{phase.category}</h3>
                </div>
                
                <div className="space-y-3">
                  {phase.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Focus Section */}
      <section className="section-padding bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-12">Sécurité avant tout</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-blue-800">
                  👨‍👩‍👧‍👦 Protection famille
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2">Enfants</h4>
                    <p className="text-sm text-gray-600">
                      Produits homologués, stations sécurisées, délais de réintégration respectés. 
                      Nous t'expliquons tout en détail.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2">Animaux domestiques</h4>
                    <p className="text-sm text-gray-600">
                      Appâts inaccessibles aux chiens/chats, zones traitées sécurisées. 
                      Conseils pour éviter tout risque.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield size={20} className="mr-2 text-green-600" />
                  Notre engagement sécurité
                </h4>
                <ul className="text-sm text-gray-600 space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Produits biocides homologués et certifiés
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Équipement de protection individuelle
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Formation continue de nos techniciens
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Assurance responsabilité civile pro
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Conseils post-traitement personnalisés
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Ils nous recommandent</h2>
            <p className="section-subtitle">Témoignages de particuliers satisfaits</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-card">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Intervention rapide pour des punaises de lit. Équipe professionnelle et discrète. 
                Problème résolu en 2 passages comme annoncé."
              </p>
              <div className="text-sm text-gray-500">
                <strong>Marie D.</strong> - Paris 11e
              </div>
            </div>
            
            <div className="service-card">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Rats dans les combles. Intervention efficace, explications claires, 
                prix honnête. Je recommande vivement."
              </p>
              <div className="text-sm text-gray-500">
                <strong>Pierre L.</strong> - Vincennes (94)
              </div>
            </div>
            
            <div className="service-card">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Problème de cafards résolu. Très rassurant pour la sécurité de nos enfants. 
                Suivi excellent après traitement."
              </p>
              <div className="text-sm text-gray-500">
                <strong>Sophie M.</strong> - Boulogne (92)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white section-padding">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Un problème à la maison ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Intervention rapide et discrète - Devis gratuit à domicile
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0142010707" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Phone size={20} />
              01 42 01 07 07
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

export default Particuliers;