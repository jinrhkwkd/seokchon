import { business, faqs, menus } from "./content";
import type { Post } from "./posts";

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

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

export function buildBlogPostingSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "ko-KR",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    author: {
      "@type": "Organization",
      name: business.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: business.name,
      url: siteUrl,
    },
  };
}

export function buildFaqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBlogListingSchema(blogPosts: Post[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${business.name} 블로그`,
    url: `${siteUrl}/blog`,
    inLanguage: "ko-KR",
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      url: `${siteUrl}/blog/${post.slug}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
