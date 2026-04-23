import type { Metadata } from "next";

import localFont from "next/font/local";

import "../styles/main.css";
import "../styles/krishora.css";

const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter/InterVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter/InterVariable-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krishora Technologies | Tech Solutions",
  description:
    "Krishora Technologies engineers scalable, elegant solutions for the hardest tech problems — web, AI, and cloud architecture.",
  keywords: [
    "tech solutions",
    "AI integration",
    "cloud architecture",
    "web development",
    "Krishora Technologies",
  ],
  openGraph: {
    title: "Krishora Technologies | Tech Solutions",
    description: "Engineering tomorrow's solutions, today.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/Molgan.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;700&family=Bruno+Ace+SC&family=Space+Grotesk:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
