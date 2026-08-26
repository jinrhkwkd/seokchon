import { business, faqs, menus } from "./content";

export const siteUrl = "https://seokchon.vercel.app";

export function buildRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: business.name,
    image: `${siteUrl}/images/store-exterior.webp`,
    servesCuisine: "한식, 백숙, 삼계탕",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      addressCountry: "KR",
    },
    telephone: business.phone,
    url: siteUrl,
    sameAs: [business.naverPlaceUrl],
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: {
        "@type": "MenuSection",
        name: "대표 메뉴",
        hasMenuItem: menus.map((menu) => ({
          "@type": "MenuItem",
          name: menu.name,
          description: menu.description,
        })),
      },
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: business.openingTime,
      closes: business.closingTime,
    },
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      addressCountry: "KR",
    },
    telephone: business.phone,
    url: siteUrl,
    sameAs: [business.naverPlaceUrl],
  };
}

export function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
