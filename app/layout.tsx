import type { Metadata } from "next";
import Script from "next/script";

import "../styles/main.css";
import "../styles/krishora.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://krishoratech.com"),
  title: "Krishora Technologies Pvt Ltd | AI Automation, LLM Development & Smart App Solutions",
  description:
    "Krishora Technologies Pvt Ltd is a leading AI-powered technology company specializing in AI automation systems, LLM development, custom app development, and intelligent business solutions. We build scalable, smart, and future-ready AI systems to automate workflows, enhance productivity, and drive digital transformation for businesses worldwide.",
  keywords: [
    "AI automation company",
    "LLM development company",
    "AI app development",
    "machine learning solutions",
    "business process automation AI",
    "custom AI software development",
    "generative AI solutions",
    "chatbot development AI",
    "AI SaaS development",
  ],
  authors: [{ name: "Krishora Technologies" }],
  openGraph: {
    title: "Krishora Technologies | AI Automation & LLM Experts Building Future-Ready Apps",
    description: "Transform your business with Krishora Technologies. We create advanced AI automation systems, powerful LLM-based solutions, and scalable mobile & web apps designed for growth, efficiency, and innovation.",
    url: "https://krishoratech.com",
    siteName: "Krishora Technologies",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Krishora Technologies AI Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishora Technologies | AI Automation & LLM Experts",
    description: "Transform your business with Krishora Technologies. Advanced AI automation and LLM-based solutions.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;700&family=Bruno+Ace+SC&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Krishora Technologies Pvt Ltd",
              "url": "https://krishoratech.com",
              "logo": "https://krishoratech.com/logo.png",
              "description": "Leading AI-powered technology company specializing in AI automation systems, LLM development, custom app development, and intelligent business solutions.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "India"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
