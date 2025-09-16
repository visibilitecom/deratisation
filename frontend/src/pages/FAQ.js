import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      category: 'Punaises de lit',
      questions: [
        {
          question: 'Comment savoir si j\'ai des punaises de lit ?',
          answer: 'Les signes principaux sont : piqûres alignées sur la peau au réveil, taches de sang sur les draps, présence de punaises vivantes dans les coutures du matelas, odeur douceâtre caractéristique dans la chambre, et traces noires (excréments) sur le sommier ou les murs.'
        },
        {
          question: 'Combien coûte un traitement contre les punaises ?',
          answer: 'Le tarif varie entre 180€ et 280€ pour les particuliers, incluant 2 passages et une garantie de 3 mois. Le prix dépend de la surface à traiter et du niveau d\'infestation. Un devis gratuit est toujours établi avant intervention.'
        },
        {
          question: 'Combien de temps dure un traitement ?',
          answer: 'Un traitement complet nécessite 2 passages espacés de 15 jours. Chaque intervention dure 1 à 3 heures selon la surface. Tu dois sortir du logement pendant 4h après chaque traitement pour ta sécurité.'
        },
        {
          question: 'Les traitements sont-ils dangereux pour les enfants ?',
          answer: 'Non, nous utilisons des produits homologués et adaptons nos méthodes. Les enfants peuvent réintégrer les lieux 4h après traitement, une fois l\'aération effectuée. Nous te donnons toutes les consignes de sécurité.'
        }
      ]
    },
    {
      category: 'Dératisation',
      questions: [
        {
          question: 'Comment se déroule une dératisation ?',
          answer: 'Nous commençons par un diagnostic gratuit pour identifier l\'espèce et les points d\'entrée. Puis nous installons des appâts sécurisés et des pièges adaptés. Nous bouchons les accès et programmons un suivi. Un rapport détaillé te sera remis.'
        },
        {
          question: 'Les appâts sont-ils dangereux pour mes animaux ?',
          answer: 'Nos stations d\'appâtage sont sécurisées et inaccessibles aux chiens et chats. Nous plaçons les dispositifs dans des zones non accessibles aux animaux domestiques. Des précautions spécifiques sont prises selon tes animaux.'
        },
        {
          question: 'Combien de temps avant de voir les résultats ?',
          answer: 'Les premiers effets sont visibles sous 3 à 7 jours. L\'élimination complète prend généralement 2 à 3 semaines. Un suivi est effectué à 15 jours puis à 1 mois pour vérifier l\'efficacité du traitement.'
        }
      ]
    },
    {
      category: 'Désinsectisation',
      questions: [
        {
          question: 'Traitez-vous tous les types d\'insectes ?',
          answer: 'Oui, nous traitons cafards, blattes, fourmis, puces, mites alimentaires, mouches, moustiques, guêpes et frelons. Chaque insecte nécessite une méthode spécifique que nous maîtrisons parfaitement.'
        },
        {
          question: 'Le traitement contre les cafards est-il efficace ?',
          answer: 'Oui, nous utilisons du gel professionnel très efficace. Les cafards consomment l\'appât et contaminent leurs congénères. L\'éradication complète prend 2 à 4 semaines avec un taux de réussite de 95%.'
        }
      ]
    },
    {
      category: 'Professionnels & HACCP',
      questions: [
        {
          question: 'Respectez-vous les normes HACCP ?',
          answer: 'Absolument. Nous fournissons tous les documents obligatoires : plan de lutte, registre d\'interventions, certificats des produits utilisés, et rapport de conformité. Notre agrément biocides garantit la légalité de nos interventions.'
        },
        {
          question: 'Proposez-vous des contrats de maintenance ?',
          answer: 'Oui, nous proposons des contrats annuels avec visites programmées (trimestrielles ou semestrielles) et interventions d\'urgence illimitées. Tarifs entre 400€ et 1500€/an selon le secteur et la surface.'
        },
        {
          question: 'Intervenez-vous en dehors des heures d\'ouverture ?',
          answer: 'Oui, pour les professionnels nous intervenons hors heures d\'ouverture pour éviter de perturber l\'activité. Un léger surcoût s\'applique pour les interventions nocturnes (20h-6h).'
        }
      ]
    },
    {
      category: 'Pratique',
      questions: [
        {
          question: 'Faut-il préparer quelque chose avant votre venue ?',
          answer: 'Oui, nous te donnons une checklist précise selon le traitement : évacuation des animaux, nettoyage des zones, lavage du linge à 60°C pour les punaises, libération des accès pour la dératisation. Tout est expliqué lors de la prise de RDV.'
        },
        {
          question: 'Quels sont vos moyens de paiement ?',
          answer: 'Nous acceptons les espèces, chèques, virements bancaires (pros) et cartes bancaires (TPE sur place). Une facture détaillée et une attestation d\'intervention te sont systématiquement remises.'
        },
        {
          question: 'Proposez-vous une garantie ?',
          answer: 'Oui, nous garantissons nos interventions : 3 mois pour les punaises de lit, 1 mois pour la dératisation, et adaptation selon le service. Si le problème persiste, nous revenons gratuitement pour un complément de traitement.'
        },
        {
          question: 'Intervenez-vous en urgence le weekend ?',
          answer: 'Oui, nous intervenons 7j/7 y compris les weekends et jours fériés. Pour les urgences (guêpes, allergie, infestation massive), nous nous déplaçons sous 2h avec un léger surcoût de 30€.'
        }
      ]
    }
  ];

  const toggleExpand = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link to="/" className="text-green-600 hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">FAQ</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-blue-50 section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="section-title mb-6">
              Questions fréquentes
            </h1>
            <p className="section-subtitle">
              Toutes les réponses à tes questions sur nos interventions, 
              tarifs et méthodes. Tu ne trouves pas ta réponse ? Appelle-nous !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+33142010707" className="btn-primary text-lg px-8 py-4">
                <Phone size={20} />
                Une question ? Appelle
              </a>
              <Link to="/contact" className="btn-secondary text-lg px-8 py-4">
                <FileText size={20} />
                Formulaire de contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans la FAQ..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFAQ.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center bg-gray-50 py-4 rounded-lg">
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const key = `${categoryIndex}-${questionIndex}`;
                    const isExpanded = expandedItems.has(key);
                    
                    return (
                      <div key={questionIndex} className="border border-gray-200 rounded-lg">
                        <button
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                          onClick={() => toggleExpand(categoryIndex, questionIndex)}
                        >
                          <span className="font-medium text-gray-900 pr-4">
                            {item.question}
                          </span>
                          {isExpanded ? (
                            <ChevronUp size={20} className="text-green-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <div className="px-6 pb-4">
                            <div className="pt-2 border-t border-gray-100">
                              <p className="text-gray-700 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {filteredFAQ.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  Aucune question trouvée pour "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-green-600 hover:underline"
                >
                  Voir toutes les questions
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Tu n'as pas trouvé ta réponse ?
            </h2>
            <p className="text-gray-600 mb-8">
              Notre équipe est là pour répondre à toutes tes questions spécifiques. 
              N'hésite pas à nous contacter pour des conseils personnalisés.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Phone size={32} className="text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Appel direct</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Répones immédiates de 8h à 19h en semaine, 9h à 17h le weekend
                </p>
                <a href="tel:+33142010707" className="btn-primary">
                  <Phone size={18} />
                  +33 1 42 01 07 07
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <FileText size={32} className="text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Message écrit</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Décris ton problème en détail, nous te recontactons sous 2h
                </p>
                <Link to="/contact" className="btn-secondary">
                  <FileText size={18} />
                  Formulaire de contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-red-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-2">🚨 Urgence immédiate ?</h2>
          <p className="mb-4">Guêpes, allergie, situation critique : intervention sous 2h possible</p>
          <a href="tel:+33142010707" className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
            <Phone size={18} />
            Appel d'urgence
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;