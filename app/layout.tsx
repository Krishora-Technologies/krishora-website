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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
