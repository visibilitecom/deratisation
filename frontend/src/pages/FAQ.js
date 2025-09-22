import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, ChevronDown, ChevronUp, Search } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      category: 'Punaises de lit Paris',
      questions: [
        {
          question: 'Comment savoir si j\'ai des punaises de lit à Paris ?',
          answer: 'Les signes principaux sont : piqûres alignées sur la peau au réveil, taches de sang sur les draps, présence de punaises vivantes dans les coutures du matelas, odeur douceâtre caractéristique dans la chambre, et traces noires (excréments) sur le sommier ou les murs. À Paris, les punaises de lit sont fréquentes dans tous les arrondissements.'
        },
        {
          question: 'Prix traitement punaises de lit Paris : combien ça coûte ?',
          answer: 'Le tarif varie entre 180€ et 280€ pour les particuliers parisiens, incluant 2 passages et une garantie de 3 mois. Le prix dépend de la surface à traiter et du niveau d\'infestation. Un devis gratuit est toujours établi avant intervention dans Paris et IDF.'
        },
        {
          question: 'Durée traitement punaises de lit Paris : combien de temps ?',
          answer: 'Un traitement complet contre les punaises de lit à Paris nécessite 2 passages espacés de 15 jours. Chaque intervention dure 1 à 3 heures selon la surface. Tu dois sortir du logement pendant 4h après chaque traitement pour ta sécurité.'
        },
        {
          question: 'Traitement punaises de lit dangereux pour enfants Paris ?',
          answer: 'Non, nous utilisons des produits homologués pour les interventions à Paris et adaptons nos méthodes. Les enfants peuvent réintégrer les lieux 4h après traitement, une fois l\'aération effectuée. Nous te donnons toutes les consignes de sécurité spécifiques à Paris.'
        }
      ]
    },
    {
      category: 'Dératisation Paris',
      questions: [
        {
          question: 'Comment se déroule une dératisation à Paris ?',
          answer: 'Notre dératisation à Paris commence par un diagnostic gratuit pour identifier l\'espèce (rats, souris) et les points d\'entrée. Puis nous installons des appâts sécurisés et des pièges adaptés aux immeubles parisiens. Nous bouchons les accès et programmons un suivi. Un rapport détaillé te sera remis.'
        },
        {
          question: 'Appâts dératisation dangereux pour animaux Paris ?',
          answer: 'Nos stations d\'appâtage pour la dératisation à Paris sont sécurisées et inaccessibles aux chiens et chats. Nous plaçons les dispositifs dans des zones non accessibles aux animaux domestiques. Des précautions spécifiques sont prises selon tes animaux et le type de logement parisien.'
        },
        {
          question: 'Délai efficacité dératisation Paris : quand voir résultats ?',
          answer: 'Les premiers effets de la dératisation à Paris sont visibles sous 3 à 7 jours. L\'élimination complète des rats et souris prend généralement 2 à 3 semaines. Un suivi est effectué à 15 jours puis à 1 mois pour vérifier l\'efficacité du traitement.'
        }
      ]
    },
    {
      category: 'Désinsectisation Paris',
      questions: [
        {
          question: 'Quels insectes traitez-vous à Paris ?',
          answer: 'Notre désinsectisation à Paris traite cafards, blattes, fourmis, puces, mites alimentaires, mouches, moustiques, guêpes et frelons. Chaque insecte nécessite une méthode spécifique que nous maîtrisons parfaitement pour les logements et commerces parisiens.'
        },
        {
          question: 'Traitement cafards Paris efficace ?',
          answer: 'Oui, notre désinsectisation cafards à Paris utilise du gel professionnel très efficace. Les cafards consomment l\'appât et contaminent leurs congénères. L\'éradication complète prend 2 à 4 semaines avec un taux de réussite de 95% dans les logements parisiens.'
        }
      ]
    },
    {
      category: 'Professionnels HACCP Paris',
      questions: [
        {
          question: 'Dératisation restaurant Paris : normes HACCP respectées ?',
          answer: 'Absolument. Nos interventions de dératisation pour restaurants parisiens fournissent tous les documents obligatoires : plan de lutte, registre d\'interventions, certificats des produits utilisés, et rapport de conformité HACCP. Notre agrément biocides garantit la légalité de nos interventions.'
        },
        {
          question: 'Contrat dératisation annuel Paris pour professionnels ?',
          answer: 'Oui, nous proposons des contrats annuels de dératisation pour les professionnels parisiens avec visites programmées (trimestrielles ou semestrielles) et interventions d\'urgence illimitées. Tarifs entre 400€ et 1500€/an selon le secteur et la surface à Paris.'
        },
        {
          question: 'Intervention dératisation Paris hors heures ouverture ?',
          answer: 'Oui, pour les professionnels parisiens nous intervenons hors heures d\'ouverture pour éviter de perturber l\'activité. Un léger surcoût s\'applique pour les interventions nocturnes (20h-6h) dans Paris et la petite couronne.'
        }
      ]
    },
    {
      category: 'Pratique Paris',
      questions: [
        {
          question: 'Préparation avant dératisation Paris : que faire ?',
          answer: 'Pour une dératisation efficace à Paris, nous te donnons une checklist précise : évacuation des animaux, nettoyage des zones, lavage du linge à 60°C pour les punaises, libération des accès pour la dératisation. Tout est expliqué lors de la prise de RDV parisien.'
        },
        {
          question: 'Moyens paiement dératisation Paris ?',
          answer: 'Pour nos interventions à Paris, nous acceptons les espèces, chèques, virements bancaires (pros) et cartes bancaires (TPE sur place). Une facture détaillée et une attestation d\'intervention te sont systématiquement remises après notre intervention parisienne.'
        },
        {
          question: 'Garantie dératisation Paris ?',
          answer: 'Oui, nous garantissons nos interventions de dératisation à Paris : 3 mois pour les punaises de lit, 1 mois pour la dératisation rats/souris, et adaptation selon le service. Si le problème persiste dans ton logement parisien, nous revenons gratuitement.'
        },
        {
          question: 'Dératisation urgence weekend Paris ?',
          answer: 'Oui, nous intervenons pour la dératisation à Paris 7j/7 y compris les weekends et jours fériés. Pour les urgences (guêpes, allergie, infestation massive), nous nous déplaçons sous 2h dans Paris avec un léger surcoût de 30€.'
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

  // Données structurées FAQ
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(category => 
      category.questions.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    )
  };

  // Breadcrumbs
  const breadcrumbs = [
    { name: 'Accueil', url: '/' },
    { name: 'FAQ Dératisation Paris', url: '/faq' }
  ];

  return (
    <>
      <SEOHead
        title="FAQ Dératisation Paris - Questions Fréquentes | Acces Services"
        description="Toutes les réponses à tes questions sur la dératisation à Paris : prix, délais, méthodes, sécurité. FAQ complète punaises de lit, désinsectisation Paris."
        keywords="FAQ dératisation Paris, questions dératisation, prix dératisation Paris, punaises de lit FAQ, désinsectisation questions, dératisation restaurant Paris, traitement cafards FAQ"
        canonicalUrl="/faq"
        breadcrumbs={breadcrumbs}
        structuredData={faqStructuredData}
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
                <span className="text-gray-600" itemProp="name">FAQ Dératisation Paris</span>
                <meta itemProp="position" content="2" />
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="hero-bg section-padding" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1628352081506-83c43123ed6d)'}}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center hero-content">
              <h1 className="section-title mb-6">
                FAQ Dératisation Paris - Questions Fréquentes
              </h1>
              <p className="section-subtitle">
                Toutes les réponses à tes questions sur la dératisation, punaises de lit et désinsectisation à Paris. 
                Tu ne trouves pas ta réponse ? Appelle-nous !
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+33142010707" className="btn-primary text-lg px-8 py-4">
                  <Phone size={20} />
                  01 42 01 07 07
                </a>
                <Link to="/contact" className="btn-secondary text-lg px-8 py-4">
                  <FileText size={20} />
                  Devis dératisation Paris
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
                  placeholder="Rechercher dans la FAQ dératisation Paris..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-white" itemScope itemType="https://schema.org/FAQPage">
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
                        <div key={questionIndex} className="border border-gray-200 rounded-lg" itemScope itemType="https://schema.org/Question">
                          <button
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                            onClick={() => toggleExpand(categoryIndex, questionIndex)}
                          >
                            <span className="font-medium text-gray-900 pr-4" itemProp="name">
                              {item.question}
                            </span>
                            {isExpanded ? (
                              <ChevronUp size={20} className="text-green-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          
                          {isExpanded && (
                            <div className="px-6 pb-4" itemScope itemType="https://schema.org/Answer">
                              <div className="pt-2 border-t border-gray-100">
                                <p className="text-gray-700 leading-relaxed" itemProp="text">
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
                    Voir toutes les questions dératisation
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
                Question dératisation Paris non trouvée ?
              </h2>
              <p className="text-gray-600 mb-8">
                Notre équipe spécialisée en dératisation Paris est là pour répondre à toutes tes questions spécifiques. 
                N'hésite pas à nous contacter pour des conseils personnalisés sur la dératisation à Paris.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <Phone size={32} className="text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Expert dératisation Paris</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Réponses immédiates de 8h à 19h en semaine, 9h à 17h le weekend
                  </p>
                  <a href="tel:+33142010707" className="btn-primary">
                    <Phone size={18} />
                    Dératisation Paris : 01 42 01 07 07
                  </a>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <FileText size={32} className="text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Devis dératisation Paris</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Décris ton problème de dératisation, nous te recontactons sous 2h
                  </p>
                  <Link to="/contact" className="btn-secondary">
                    <FileText size={18} />
                    Devis dératisation gratuit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Banner */}
        <section className="bg-red-600 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl font-bold mb-2">🚨 Urgence dératisation Paris ?</h2>
            <p className="mb-4">Rats, souris, guêpes : intervention dératisation sous 2h possible à Paris</p>
            <a href="tel:+33142010707" className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Phone size={18} />
              Dératisation urgence Paris
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQ;