import type { Metadata } from "next";

import "../styles/main.css";
import "../styles/krishora.css";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;700&family=Bruno+Ace+SC&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
