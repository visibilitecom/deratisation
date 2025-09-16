import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  ogImage,
  breadcrumbs = [],
  structuredData = {},
  localBusiness = true
}) => {
  const baseUrl = "https://acces-services-paris.fr";
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const defaultImage = `${baseUrl}/images/acces-services-og.jpg`;

  // Données structurées LocalBusiness
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}#business`,
    "name": "Acces Services",
    "description": "Entreprise spécialisée en dératisation, punaises de lit et désinsectisation à Paris et Île-de-France",
    "url": baseUrl,
    "telephone": "+33142010707",
    "email": "contact@acces-services-paris.fr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "21 rue Meynadier",
      "addressLocality": "Paris",
      "postalCode": "75019",
      "addressCountry": "FR",
      "addressRegion": "Île-de-France"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.8566",
      "longitude": "2.3522"
    },
    "openingHours": "Mo-Su 08:00-19:00",
    "areaServed": [
      "Paris", "Île-de-France", "Seine-et-Marne", "Yvelines", "Essonne", 
      "Hauts-de-Seine", "Seine-Saint-Denis", "Val-de-Marne", "Val-d'Oise"
    ],
    "serviceType": [
      "Dératisation", "Désinsectisation", "Punaises de lit", "Guêpes", "Frelons"
    ],
    "priceRange": "€€",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5"
    },
    "sameAs": [
      "https://www.facebook.com/accesservices",
      "https://www.linkedin.com/company/acces-services"
    ]
  };

  // Données structurées Breadcrumb
  const breadcrumbData = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${baseUrl}${crumb.url}`
    }))
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="Acces Services" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="fr-FR" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Acces Services" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultImage} />
      <meta name="twitter:site" content="@AccesServices" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="FR-75" />
      <meta name="geo.placename" content="Paris" />
      <meta name="geo.position" content="48.8566;2.3522" />
      <meta name="ICBM" content="48.8566, 2.3522" />
      
      {/* Structured Data */}
      {localBusiness && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessData)}
        </script>
      )}
      
      {breadcrumbData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      )}
      
      {Object.keys(structuredData).length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
    </Helmet>
  );
};

export default SEOHead;