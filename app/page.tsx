import HomeClient from "@/components/HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Krishora Technologies | Premier AI Automation & LLM Development Studio",
  description: "Transform your business with production-grade AI systems. We specialize in custom LLM development, RAG pipelines, AI agents, and enterprise automation solutions.",
  keywords: [
    "AI automation studio",
    "LLM development agency",
    "Custom AI agents",
    "Enterprise AI solutions",
    "RAG development",
    "AI workflow automation",
    "Smart business applications",
    "AI consulting India",
    "Generative AI development"
  ],
  alternates: {
    canonical: "https://krishoratech.com",
  },
  openGraph: {
    title: "Krishora Technologies | AI Automation Experts",
    description: "Building the future of intelligent business systems. Custom LLM and AI automation services.",
    url: "https://krishoratech.com",
    siteName: "Krishora Technologies",
    images: [{ url: "/og-image.jpg" }],
    type: "website",
  },
};

export default function Home() {
  return <HomeClient />;
}
