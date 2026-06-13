import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI & LLM Development Services | RAG, LangChain, Agents',
  description:
    'Hire Mamun Miah for AI & LLM engineering: RAG pipelines, LangChain agents, LangGraph workflows, fine-tuned models, and AI-powered SaaS integrations. Production-grade AI for your business.',
  keywords: [
    'hire AI developer RAG pipeline',
    'LangChain developer freelance',
    'LangGraph developer',
    'custom AI chatbot development',
    'LLM integration services',
    'AI agent development',
    'RAG system developer',
    'HuggingFace developer',
    'fine-tune LLM developer',
    'AI-powered SaaS development',
    'Ollama local LLM developer',
    'LlamaIndex developer',
    'AI development Bangladesh',
  ],
  alternates: {
    canonical: 'https://mamundev.com/ai-development',
  },
  openGraph: {
    title: 'AI & LLM Engineering Services | Mamun Miah',
    description:
      'RAG pipelines, LangChain agents, fine-tuned LLMs, and autonomous AI systems for your product. Hire an AI specialist.',
    url: 'https://mamundev.com/ai-development',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & LLM Engineering Services | Mamun Miah',
    description:
      'RAG, LangChain, LangGraph, HuggingFace, fine-tuning — production-grade AI development for your business.',
    images: ['/images/og-image.jpg'],
  },
};

export default function AiDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
