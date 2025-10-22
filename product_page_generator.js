const path = require('path');
/* * SEYMR® - Product Pages Generator
 * Génère automatiquement toutes les pages produits depuis products.json
 */

const fs = require('fs').promises;

// Descriptions complètes des produits
const PRODUCT_DESCRIPTIONS = {
  'fauteuil-sisit': {
    intro: "Le fauteuil SEYMR® naît d'une ambition rare : inviter l'art dans l'intimité du quotidien, non comme un objet de contemplation, mais comme une expérience à vivre. Il est le fruit d'un dialogue entre la fulgurance créative de la Guadeloupe et l'excellence artisanale de Londres.",
    sections: [
      {
        title: "L'Œuvre Transposée",
        content: "Le motif qui l'habille n'est pas un imprimé, mais la rémanence d'une œuvre d'art unique, originale et certifiée. Grâce à un procédé de pointe, le pigment imprègne le cœur même de la fibre du velours, transposant l'émotion et le geste de l'artiste avec une fidélité absolue."
      },
      {
        title: "La Quintessence de la Matière",
        content: "L'assise, généreuse et structurée par une mousse de très haute densité (45 kg/m³), offre une promesse de confort et de tenue durable. Elle est gainée d'un velours haute couture, dont le toucher profond et la texture subtile servent d'écrin au motif. L'ensemble repose sur un piètement épuré en bois noble, issu de forêts gérées durablement (label FSC)."
      },
      {
        title: "Une Signature d'Exclusivité",
        content: "Seuls quarante-quatre exemplaires de ce fauteuil seront édités pour le monde. Chaque pièce est numérotée sous l'assise, un sceau discret qui en garantit l'authenticité et la provenance. Cet engagement de rareté est complété par une garantie de dix ans."
      }
    ],
    specs: [
      "Hauteur totale : 74 cm",
      "Largeur : 63 cm",
      "Profondeur d'assise : 49 cm",
      "Hauteur de dossier : 55 cm",
      "Largeur de dossier : 50 cm",
      "Piètement : Hauteur avant 23 cm / arrière 19 cm",
      "Mousse : Haute densité 45 kg/m³",
      "Certification : Bois FSC"
    ]
  },
  'paravent': {
    intro: "Le paravent SEYMR® est une pièce d'architecture modulable. Il ne se contente pas de diviser l'espace ; il le sculpte. Ses quatre panneaux, habillés d'un pattern symétrique agissent comme une frontière vibratoire, créant des sanctuaires au sein d'un volume plus grand.",
    sections: [
      {
        title: "L'Œuvre Transposée et la Structure",
        content: "Le revêtement de chaque panneau est réalisé par la transposition numérique d'une œuvre originale, dont le pigment a été fusionné à la fibre du support. Cette technique assure que l'intensité chromatique et la fidélité fréquentielle du motif durent dans le temps. Assemblé à la main dans notre manufacture londonienne, le paravent allie légèreté structurelle et présence monumentale."
      }
    ],
    specs: [
      "Structure : 4 panneaux",
      "Dimensions totales : 224 cm × 152 cm",
      "Options de motif : 64,06 × 81,81 cm ou 125,26 × 156,9 cm",
      "Charnières haute précision",
      "Assemblage manuel à Londres"
    ]
  },
  'tapis-nexus': {
    intro: "Un tapis SEYMR® définit un territoire unifié, une zone d'influence qui structure l'entièreté de la pièce. Marcher sur ses patterns, c'est interagir avec une cartographie fréquentielle qui ancre l'espace.",
    sections: [
      {
        title: "L'Œuvre Transposée et la Matière",
        content: "Chaque tapis est une pièce de panne de velours marbrée, une matière choisie pour sa texture profonde et ses reflets changeants qui animent le design. Le motif est la rémanence d'une œuvre d'art certifiée, dont la transposition pigmentaire garantit l'intégrité de l'intention artistique. Tissé avec une extrême densité par nos artisans à Londres."
      }
    ],
    specs: [
      "Dimensions : 128 cm × 150 cm",
      "Matière : Panne de velours marbrée",
      "Tissage haute densité",
      "Finitions : Frange en coton",
      "Coutures au fil blanc"
    ]
  },
  'repose-pieds-satellite': {
    intro: "Conçu comme une extension du territoire personnel, SATELLITE est le complément gravitationnel d'une pièce maîtresse ou une sculpture autonome. Le motif fréquentiel qui l'habille est une continuation du champ d'influence.",
    sections: [
      {
        title: "L'Œuvre Transposée et la Maîtrise Artisanale",
        content: "Le motif, transposé avec une fidélité pigmentaire sur le velours, assure que le Repose-Pieds maintient l'intégrité de l'œuvre originale. La structure et le piètement sont façonnés en bois certifié FSC, garantissant une source responsable et une stabilité parfaite."
      }
    ],
    specs: [
      "Dimensions : 38 × 38 × 39 cm",
      "Poids : 3,5 kg",
      "Velours ChiChi ignifuge",
      "Structure bois certifié FSC",
      "Hauteur piètement : 25 cm",
      "Profondeur coussin : 14 cm"
    ]
  },
  'pouf-cosmosis': {
    intro: "COSMOSIS est une sphère de 70 cm qui impose sa centralité magnétique à son espace. Son volume, agissant comme le pivot gravitationnel de son environnement, est habillé d'une impression à la fidélité muséale du pattern SEYMR®.",
    sections: [
      {
        title: "L'Œuvre Transposée et la Technologie",
        content: "Sa matérialité évoque la technologie spatiale : le motif est le résultat d'une transposition intégrale de l'œuvre sur une suédine ultra-dense (Vision 250g/m²). Un garnissage viscoélastique procure une expérience d'apesanteur maîtrisée et de soutien morphologique absolu."
      }
    ],
    specs: [
      "Dimensions : Ø 70 cm × H 70 cm",
      "Matière : Suédine Vision 250g/m²",
      "Rembourrage viscoélastique",
      "Façonnage manuel à Londres"
    ]
  },
  'tirage-art': {
    intro: "Ce tirage d'art est la manifestation la plus pure de l'art fréquentiel, il constitue un fragment du code SEYMR®, une fenêtre ouverte sur les architectures invisibles à l'œil qui gouvernent l'espace.",
    sections: [
      {
        title: "La Matérialité de l'Archive",
        content: "L'œuvre est matérialisée par une impression de haute précision sur une soie de 51 cm, choisie pour sa capacité à capturer la subtilité du trait et la profondeur des noirs. L'encadrement en bois noir mat, certifié FSC, est réalisé par nos maîtres artisans à Londres pour créer un contraste qui isole et sacralise le design."
      }
    ],
    specs: [
      "Support : Soie 51 cm",
      "Cadre : Bois noir mat FSC 61 cm",
      "Édition : 11 exemplaires numérotés",
      "Certificat A5 détachable au verso",
      "Impression haute précision"
    ]
  },
  'sac-conqueror': {
    intro: "Le sac CONQUEROR est un fragment de souveraineté mobile. Il est conçu comme une archive personnelle qui vous accompagne, son pattern agissant comme une signature fréquentielle qui délimite votre espace personnel.",
    sections: [
      {
        title: "Maîtrise Artisanale et Matériaux Souverains",
        content: "Chaque sac est façonné à la main dans notre manufacture londonienne à partir d'un cuir Nappa texturé, sélectionné pour sa robustesse et sa noblesse. La finition du pattern est le fruit d'une transposition et d'une gravure de haute précision pour garantir l'intégrité du code SEYMR® sur la texture du cuir."
      }
    ],
    specs: [
      "Dimensions : 51 × 23 × 28,5 cm",
      "Matériau : Cuir Nappa pleine fleur texturé",
      "Gravure de précision",
      "Pièces métalliques : Gris acier",
      "Coutures : Fil noir charbon"
    ]
  },
  'porte-documents': {
    intro: "Cet objet est conçu pour sanctuariser les instruments de votre souveraineté : contrats, documents, créations. Le pattern qui l'enveloppe agit comme un sceau protecteur, une affirmation que le contenu est aussi important que le contenant.",
    sections: [
      {
        title: "Maîtrise Artisanale et Exclusivité",
        content: "Façonné à la main dans notre manufacture de Londres à partir d'un cuir Nappa texturé, il est le fruit d'une maîtrise artisanale absolue. La transposition du pattern sur le cuir est réalisée avec une précision qui garantit une tension graphique et une longévité parfaite."
      }
    ],
    specs: [
      "Cuir Nappa pleine fleur texturé",
      "Transposition de précision",
      "Pièces métalliques : Gris acier",
      "Coutures : Fil noir charbon",
      "Édition : 99 exemplaires"
    ]
  },
  'valise': {
    intro: "Voyager avec cet objet, c'est déplacer son centre de gravité. La valise SEYMR® est un vecteur qui projette votre identité dans les espaces de transition. Elle est plus qu'un bagage ; c'est une affirmation de votre présence.",
    sections: [
      {
        title: "L'Œuvre Transposée sur Coque",
        content: "Sa coque protectrice est habillée d'un pattern symétrique. La fusion du design sur la structure est une opération de haute précision, réalisée dans notre manufacture de Londres pour garantir une adhérence et une durabilité parfaites. Le motif est la rémanence haute définition de l'œuvre."
      }
    ],
    specs: [
      "Format : Cabine standard",
      "Technique : Fusion haute précision",
      "Coque rigide protectrice",
      "Édition : 99 exemplaires",
      "Code SEYMR® intégré"
    ]
  },
  'casquette': {
    intro: "Plus qu'un accessoire, cette casquette est un signe d'appartenance. Portée, elle affirme une adhésion à une philosophie et à une esthétique qui transcendent les codes traditionnels.",
    sections: [
      {
        title: "L'Œuvre Transposée sur Soie",
        content: "La pièce est confectionnée en satin de soie 85 g/m², une matière choisie pour sa fluidité et son contact luxueux. Le motif est la transposition digitale fidèle du code SEYMR® sur le textile. Les surpiqûres précises, réalisées dans notre atelier de Londres, témoignent de notre exigence de perfection."
      }
    ],
    specs: [
      "Matière : Satin de soie 85 g/m²",
      "Surpiqûres crème",
      "Métal : Nickel",
      "Édition : 99 exemplaires",
      "Transposition digitale fidèle"
    ]
  }
  // Ajoutez d'autres produits ici si nécessaire
};

/**
 * Template HTML de page produit
 * Génère le contenu HTML complet pour une page produit donnée.
 */
function generateProductHTML(product, description) {
  const slug = product.id;
  const pageUrl = `https://seymr.art/${slug}.html`; // URL complète avec .html
  const itemId = `SEYMR-${slug.toUpperCase().replace(/-/g, '')}-001`; // ID unique pour GA4/Schema
  
  // Générer le HTML pour la liste des spécifications complètes
  const specsHTML = (description.specs || []).map(spec => `<li>${spec}</li>`).join('\n                                ');
  
  // Générer le HTML pour les sections de description
  const sectionsHTML = (description.sections || []).map(section => `
                            <h3>${section.title}</h3>
                            <p>${section.content}</p>
                        `).join('\n');
  
  // Préparer les images pour la galerie (plus robuste)
  const mainImage = product.images?.main || 'assets/placeholder.jpg'; // Image principale ou fallback
  const galleryImages = Array.isArray(product.images?.gallery) ? product.images.gallery : [];
  // Assurer que les chemins commencent par /assets/ (pour les URL absolues)
  const absoluteMainImage = mainImage.startsWith('assets/') ? `/${mainImage}` : mainImage;
  const absoluteGalleryImages = galleryImages.map(img => img.startsWith('assets/') ? `/${img}` : img);
  const absoluteThumbnails = [absoluteMainImage, ...absoluteGalleryImages].slice(0, 4); 
  const schemaImages = [absoluteMainImage, ...absoluteGalleryImages]; // Toutes les images pour Schema.org

  // Formatter le prix pour l'affichage
  const formattedPrice = product.price ? product.price.toLocaleString('fr-FR') + ' €' : 'Sur demande';

  // Structure HTML complète de la page
  return `<!DOCTYPE html>
<html lang="fr" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${product.display_name} - ${product.tagline} | SEYMR®</title>
    
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="${product.display_name} SEYMR® - ${product.description_short}. ${formattedPrice}. ${product.manufacturing}.">
    <meta name="keywords" content="${slug}, SEYMR, art fréquentiel, ${product.category}, édition limitée">
    
    <meta property="og:title" content="${product.display_name} - ${product.tagline} | SEYMR®">
    <meta property="og:description" content="${product.edition}. ${product.description_long.substring(0, 150)}...">
    <meta property="og:type" content="product">
    <meta property="og:url" content="${pageUrl}"> 
    <meta property="og:image" content="https://seymr.art${absoluteMainImage}"> <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    ${product.price ? `<meta property="product:price:amount" content="${product.price}">` : ''}
    <meta property="product:price:currency" content="EUR">
    
    <link rel="canonical" href="${pageUrl}"> 
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <style>
        :root{--or-souverain:#D4AF37;--noir-absolu:#0A0A0A;--blanc-pur:#FAFAFA;--gris-noble:#2A2A2A;--font-titre:'Cormorant Garamond',serif;--font-corps:'Montserrat',sans-serif}*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:var(--font-corps);background:var(--noir-absolu);color:var(--blanc-pur);overflow-x:hidden;min-height:100vh;font-weight:300;line-height:1.6}nav{position:fixed;top:0;width:100%;z-index:1000;background:rgba(10,10,10,0.98);backdrop-filter:blur(10px);transition:all .3s}
        .skip-link{position:absolute;top:-40px;left:0;background:var(--or-souverain);color:var(--noir-absolu);padding:8px;text-decoration:none;z-index:9999} .skip-link:focus{top:0}
    </style>
    
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/styles.css"> 
    <link rel="stylesheet" href="/assets/css/product_page.css"> 
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "${product.display_name}",
      "description": "${product.description_long}",
      "image": [
        ${schemaImages.map(img => `"https://seymr.art${img}"`).join(',\n        ')}
      ],
      "sku": "${itemId}", 
      "brand": {
        "@type": "Brand",
        "name": "SEYMR®"
      },
      "offers": {
        "@type": "Offer",
        "url": "${pageUrl}", 
        "priceCurrency": "EUR",
        ${product.price ? `"price": "${product.price}",` : ''} 
        "priceValidUntil": "2025-12-31", 
        "itemCondition": "https://schema.org/NewCondition", 
        "availability": "${product.edition && (product.edition.includes('exemplaires') || product.edition.includes('Limited')) ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock'}", 
        "seller": {
          "@type": "Organization",
          "name": "SEYMR®"
        }
      },
      "material": "${product.materials}",
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Édition",
          "value": "${product.edition}"
        },
        {
          "@type": "PropertyValue",
          "name": "Fabrication",
          "value": "${product.manufacturing}"
        },
        {
          "@type": "PropertyValue",
          "name": "Conception",
          "value": "${product.design}"
        }
        ${product.specs && product.specs.dimensions ? `, {
          "@type": "PropertyValue",
          "name": "Dimensions",
          "value": "${product.specs.dimensions}"
        }` : ''}
         ${product.specs && product.specs.weight ? `, {
          "@type": "PropertyValue",
          "name": "Poids",
          "value": "${product.specs.weight}"
        }` : ''}
      ]
    }
    </script>
    
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX'); // Remplacez par votre ID GA4 réel
      
      // Événement GA4 - view_item
      gtag('event', 'view_item', {
        currency: 'EUR',
        value: ${product.price || 0}, 
        items: [{
          item_id: '${itemId}', 
          item_name: '${product.display_name}',
          item_category: '${product.category}',
          item_brand: 'SEYMR',
          price: ${product.price || 0},
          quantity: 1
        }]
      });
    </script>
</head>
<body>
    <a href="#main" class="skip-link">Aller au contenu principal</a>
    
    <nav role="navigation" aria-label="Navigation principale">
        <div class="nav-container">
            <a href="/index.html" class="nav-logo" aria-label="SEYMR - Accueil">SEYMR®</a>
            <div class="nav-center"> 
                <ul class="nav-menu" role="menubar">
                    <li role="none"><a href="/index.html#oeuvre" class="nav-link" role="menuitem">L'Œuvre</a></li>
                    <li role="none"><a href="/index.html#philosophie" class="nav-link" role="menuitem">Philosophie</a></li>
                    <li role="none"><a href="/index.html#creations" class="nav-link" role="menuitem">Créations</a></li>
                    <li role="none"><a href="/index.html#contact" class="nav-link" role="menuitem">Contact</a></li>
                </ul>
            </div>
            <div class="nav-right">
                <button class="theme-toggle" id="themeToggle" aria-label="Basculer le thème">
                    <span class="theme-icon"></span> 
                </button>
                <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Menu mobile" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </nav>
    <div id="navigation-overlay" class="navigation-overlay" aria-hidden="true">
        <ul class="mobile-nav" role="menu">
             <li role="none"><a href="/index.html#oeuvre" class="nav-link" role="menuitem">L'Œuvre</a></li>
             <li role="none"><a href="/index.html#philosophie" class="nav-link" role="menuitem">Philosophie</a></li>
             <li role="none"><a href="/index.html#creations" class="nav-link" role="menuitem">Créations</a></li>
             <li role="none"><a href="/index.html#livre" class="nav-link" role="menuitem">Le Livre</a></li>
             <li role="none"><a href="/index.html#archives" class="nav-link" role="menuitem">Archives</a></li>
             <li role="none"><a href="/index.html#contact" class="nav-link" role="menuitem">Contact</a></li>
             <li role="none"><a href="#sanctuaire" class="nav-link sanctuary-mobile" data-modal="sanctuaire">Sanctuaire</a></li>
        </ul>
    </div>

    <main id="main">
        <section class="product-hero">
            <div class="product-container">
                <nav class="product-breadcrumb" aria-label="Fil d'Ariane">
                    <a href="/index.html">Accueil</a> / 
                    <a href="/index.html#creations">Créations</a> / 
                    <span>${product.display_name}</span>
                </nav>

                <div class="product-layout">
                    <div class="product-gallery">
                        <img src="${absoluteMainImage}" 
                             alt="${product.display_name} SEYMR® - Vue principale" 
                             class="main-image" 
                             id="mainImage"
                             fetchpriority="high" width="800" height="800"> 
                        <div class="thumbnail-grid">
                            ${absoluteThumbnails.map((img, i) => `<img src="${img}" alt="Vue ${i + 1} de ${product.display_name}" class="thumbnail ${img === absoluteMainImage ? 'active' : ''}" data-full="${img}" width="150" height="150">`).join('\n                            ')}
                        </div>
                    </div>

                    <div class="product-details">
                        <h1 class="product-title">${product.display_name}</h1>
                        <p class="product-tagline">${product.tagline}</p>
                        <div class="product-price">${formattedPrice}</div>

                        <div class="product-specs">
                            <div class="spec-item">
                                <span class="spec-label">Édition</span>
                                <span class="spec-value">${product.edition}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Fabrication</span>
                                <span class="spec-value">${product.manufacturing}</span>
                            </div>
                            ${product.specs && product.specs.dimensions ? `
                            <div class="spec-item">
                                <span class="spec-label">Dimensions</span>
                                <span class="spec-value">${product.specs.dimensions}</span>
                            </div>` : ''}
                            ${product.specs && product.specs.weight ? `
                            <div class="spec-item">
                                <span class="spec-label">Poids</span>
                                <span class="spec-value">${product.specs.weight}</span>
                            </div>` : ''}
                            <div class="spec-item">
                                <span class="spec-label">Matériaux</span>
                                <span class="spec-value">${product.materials}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Délai</span>
                                <span class="spec-value">${product.delivery_time}</span> 
                            </div>
                        </div>

                        <div class="product-description">
                            ${description.intro ? `<p>${description.intro}</p>` : ''}
                            ${sectionsHTML}
                            
                            ${specsHTML.length > 0 ? `<h3>Spécifications Complètes</h3><ul>${specsHTML}</ul>` : ''}
                        </div>

                        <div class="product-cta">
                            <a href="/index.html#contact" class="btn-acquire-product" data-product="${product.name}" id="acquireBtn">
                                Initier l'acquisition
                            </a>
                            <p class="cta-secondary">Un conseiller vous contactera sous 24h</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer" role="contentinfo">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <p class="footer-logo">SEYMR®</p>
                    <p class="footer-tagline">Maison de Création • Depuis MMXVIII</p>
                </div>
                <div class="footer-contact">
                    <p>Saint-Barthélemy • Londres • Guadeloupe</p>
                    <p><a href="tel:+590691267209">+590 691 267 209</a></p>
                    <p><a href="mailto:concierge@seymr.art">concierge@seymr.art</a></p>
                </div>
                <div class="footer-legal">
                    <p>© SEYMR® 2025. Tous droits réservés.</p>
                    <p>
                        <a href="/mentions-legales.html">Mentions légales</a> • 
                        <a href="/confidentialite.html">Confidentialité</a> • 
                        <a href="/cgv.html">Conditions de Vente</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <script src="/assets/js/ga4_events_tracking.js" defer></script> 
    <script src="/assets/js/main.js" defer></script> 
    
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Galerie d'images simple
            const thumbnails = document.querySelectorAll('.thumbnail');
            const mainImage = document.getElementById('mainImage');
            
            if (mainImage && thumbnails.length > 0) {
                 // S'assure que la première miniature correspond à l'image principale initiale
                 const firstThumbSrc = thumbnails[0]?.dataset?.full;
                 // Vérifie si l'URL contient bien le domaine avant de comparer/assigner
                 if (firstThumbSrc && mainImage.src !== new URL(firstThumbSrc, window.location.origin).href) {
                     mainImage.src = firstThumbSrc; 
                 }
                
                thumbnails.forEach(thumb => {
                    thumb.addEventListener('click', function() {
                        if (this.classList.contains('active')) return; 

                        mainImage.style.opacity = '0.5'; 
                        
                        setTimeout(() => {
                           mainImage.src = this.dataset.full;
                           mainImage.alt = this.alt; 
                           mainImage.style.opacity = '1'; 
                        }, 150); 

                        thumbnails.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                        
                        // window.SEYMR_GA4?.content.selectImage(this.dataset.full);
                    });
                });
            }

            // Pré-sélection produit via bouton CTA + GA4 add_to_cart
             const acquireButton = document.getElementById('acquireBtn');
             if (acquireButton) {
                 acquireButton.addEventListener('click', function(e) {
                      const productName = this.dataset.product;
                      sessionStorage.setItem('preselectedProduct', productName); 

                      const priceText = document.querySelector('.product-price')?.textContent || '0';
                      const price = parseFloat(priceText.replace(/[^\\d.,]/g, '').replace(',', '.')) || 0; 
                      
                       if (typeof gtag === 'function') {
                            const itemIdForGA = '${itemId}'; 
                            const productNameForGA = '${product.display_name}'; 
                            
                            gtag('event', 'add_to_cart', {
                                currency: 'EUR',
                                value: price,
                                items: [{
                                    item_id: itemIdForGA,
                                    item_name: productNameForGA,
                                    item_brand: 'SEYMR',
                                    price: price,
                                    quantity: 1
                                }]
                            });
                       } else {
                            console.warn('gtag non défini, add_to_cart non envoyé.');
                       }
                       // Pas besoin de e.preventDefault() car le lien href="/index.html#contact" gère la navigation
                 });
             }
        });
    </script>
</body>
</html>`;
}

/**
 * Fonction principale qui génère toutes les pages produits.
 */
async function generateAllProductPages() {
  try {
    console.log("Lecture du catalogue produits depuis _data/products.json...");
    // Correction: Utilisation du chemin absolu correct pour Vercel
    const productsJsonPath = path.join(process.cwd(), '_data', 'products.json');
    const productsData = await fs.readFile(productsJsonPath, 'utf8');
    const { products } = JSON.parse(productsData);
    
    console.log(`🚀 Démarrage de la génération pour ${products.length} produits trouvés...`);
    
    let generatedCount = 0;
    let skippedCount = 0;
    
    // Boucler sur chaque produit du catalogue
    for (const product of products) {
      const slug = product.id; // Utiliser l'ID comme slug (nom de fichier)
      
      // Ignorer les entrées 'autre' ou 'le-livre' si elles n'ont pas de description dédiée
      if (slug === 'autre' || slug === 'le-livre') { 
          if (!PRODUCT_DESCRIPTIONS[slug]) {
             console.log(`⏩ Ignoré (entrée spéciale sans description dédiée): ${product.display_name}`);
             skippedCount++;
             continue; 
          }
      }
      
      const description = PRODUCT_DESCRIPTIONS[slug]; // Récupérer la description longue associée
      
      // Vérifier si la description existe pour ce produit
      if (!description) {
        console.warn(`⚠️  Attention: Aucune description longue (PRODUCT_DESCRIPTIONS) trouvée pour ${slug}. Page ignorée.`);
        skippedCount++;
        continue; // Passer au produit suivant
      }
      
      // Vérifier si les images existent, sinon utiliser un placeholder
       if (!product.images || !product.images.main) {
           console.warn(`⚠️  Attention: Image principale manquante pour ${slug} dans products.json. Utilisation d'un placeholder.`);
           product.images = product.images || {};
           product.images.main = product.images.main || 'assets/placeholder.jpg'; // Assigner placeholder si main manque
           product.images.gallery = product.images.gallery || []; // Assurer que gallery est un tableau
       } else {
            // Assurer que gallery est un tableau même si main existe
            product.images.gallery = Array.isArray(product.images.gallery) ? product.images.gallery : [];
       }
       
      // Générer le contenu HTML complet pour la page
      console.log(`   🛠️  Génération de ${slug}.html...`);
      const htmlContent = generateProductHTML(product, description);
      
      // Définir le nom du fichier de sortie (à la racine du projet)
      const outputFilename = `${slug}.html`;
      
      // Écrire le contenu HTML dans le fichier
      await fs.writeFile(outputFilename, htmlContent, 'utf8');
      console.log(`   ✅ Fichier généré: ${outputFilename}`);
      generatedCount++;
    }
    
    // Afficher le résumé final
    console.log(`\n✨ Terminé! ${generatedCount} pages produits générées, ${skippedCount} entrées ignorées.`);
    console.log(`\n➡️  Assurez-vous que les fichiers CSS (/assets/css/...) et JS (/assets/js/...) existent et sont à jour.`);
    console.log(`\n Poussez ces changements sur GitHub pour déclencher le déploiement Vercel.`);
    
  } catch (error) {
    // Gérer les erreurs potentielles (lecture de fichier, écriture, JSON invalide)
    console.error('❌ Erreur critique lors de la génération des pages:', error);
    process.exit(1); // Arrêter le script en cas d'erreur grave
  }
}

// Exécuter la fonction principale si le script est appelé directement
if (require.main === module) {
  generateAllProductPages();
}

// Exporter les fonctions si besoin (pour tests ou autre usage)
module.exports = { generateAllProductPages, generateProductHTML };
