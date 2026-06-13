'use client';

import React from 'react';
import Hero from '../components/Hero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBrain,
  faRobot,
  faNetworkWired,
  faDatabase,
  faCogs,
  faCode,
  faLightbulb,
  faServer,
  faGraduationCap,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { Ourachivment } from '../components/Ourachivment';
import { motion } from 'framer-motion';
import Link from 'next/link';

const aiTools = [
  {
    name: 'RAG Systems',
    desc: 'Retrieval-Augmented Generation: connecting LLMs to your own private knowledge bases for accurate, grounded responses.',
    icon: faDatabase,
    color: 'bg-purple-500/10 text-purple-500',
    tag: 'Retrieval AI'
  },
  {
    name: 'LangChain',
    desc: 'Building production-grade LLM chains, agents, and tools pipelines for complex multi-step AI workflows.',
    icon: faCogs,
    color: 'bg-blue-500/10 text-blue-500',
    tag: 'Orchestration'
  },
  {
    name: 'LangGraph',
    desc: 'Designing stateful, multi-actor LLM graphs with conditional routing, human-in-the-loop, and cyclic agent loops.',
    icon: faNetworkWired,
    color: 'bg-cyan-500/10 text-cyan-500',
    tag: 'Agent Graphs'
  },
  {
    name: 'Ollama',
    desc: 'Running and fine-tuning open-source LLMs locally (Llama 3, Mistral, Gemma) via Ollama for private, cost-efficient deployments.',
    icon: faServer,
    color: 'bg-emerald-500/10 text-emerald-500',
    tag: 'Local LLMs'
  },
  {
    name: 'Fine-Tuning',
    desc: 'Training domain-specific models using LoRA, QLoRA, and PEFT techniques so the AI speaks your brand language.',
    icon: faGraduationCap,
    color: 'bg-orange-500/10 text-orange-500',
    tag: 'PEFT / LoRA'
  },
  {
    name: 'LlamaIndex',
    desc: 'Connecting LLMs to structured and unstructured data with advanced indexing strategies, query engines, and data loaders.',
    icon: faDatabase,
    color: 'bg-amber-500/10 text-amber-500',
    tag: 'Data Indexing'
  },
  {
    name: 'DeepAgent',
    desc: 'Building autonomous AI agents that reason, plan, and take multi-step actions using tool calling and memory systems.',
    icon: faRobot,
    color: 'bg-rose-500/10 text-rose-500',
    tag: 'Autonomous AI'
  },
  {
    name: 'HuggingFace',
    desc: 'Leveraging transformers, tokenizers, datasets, and model hubs for NLP, vision, and multimodal AI applications.',
    icon: faBrain,
    color: 'bg-yellow-500/10 text-yellow-500',
    tag: 'Transformers'
  },
];

const processSteps = [
  { title: 'Discovery & Use-Case Design', desc: 'Understanding your data, goals, and the right AI architecture for your problem domain.' },
  { title: 'Data Pipeline & Embedding', desc: 'Building robust ingestion pipelines for documents, APIs, and databases into vector stores.' },
  { title: 'Model Selection & Integration', desc: 'Choosing the right LLM (open-source or API-based) and connecting it via LangChain/LlamaIndex.' },
  { title: 'Agent & Tool Building', desc: 'Developing intelligent agents with tool-calling, memory, and real-time reasoning capabilities.' },
  { title: 'Fine-Tuning & Evaluation', desc: 'Applying PEFT techniques and running quantitative evaluations to optimize model accuracy.' },
  { title: 'Deployment & Monitoring', desc: 'Shipping production-ready AI to cloud infrastructure with health checks and usage tracking.' },
];

const AiDevelopmentPage = () => {
  return (
    <div className="bg-white">
      <Hero
        title="AI & LLM Engineering"
        description="From RAG pipelines and autonomous agents to fine-tuned domain-specific models — I engineer intelligent AI systems that integrate seamlessly into your web applications and business workflows."
        backgroundImage="/images/about.avif"
        calltoAction={
          <Link href="/#contact-us" className="btn secondery-btn px-10 h-16 font-bold text-xl">
            Discuss Your AI Project
          </Link>
        }
      />

      {/* Tools Grid */}
      <section className="py-24 bg-white" id="ai-tools">
        <div className="container mx-auto px-5 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="mainheading">AI TECH STACK</h2>
            <h2 className="subheading">Tools & Frameworks I Work With</h2>
            <p className="para mt-4 max-w-2xl mx-auto">
              I work with the full modern AI/LLM stack — from local open-source models to cloud API integrations, agent frameworks, and training pipelines.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white border border-slate-100 rounded-[2rem] p-8 hover:shadow-xl hover:border-[#3b6790]/30 transition-all group"
              >
                <div className={`w-14 h-14 ${tool.color} rounded-xl flex items-center justify-center text-2xl mb-5`}>
                  <FontAwesomeIcon icon={tool.icon} />
                </div>
                <span className="text-xs font-bold text-[#efb036] uppercase tracking-widest mb-2 block">{tool.tag}</span>
                <h3 className="text-xl font-bold text-[#000248] mb-3">{tool.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Can Build */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-5 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="mainheading">WHAT I BUILD</h2>
              <h3 className="subheading mb-8">Real-World AI Applications</h3>
              <div className="space-y-5">
                {[
                  { title: 'Custom AI Chatbots', desc: 'Context-aware chatbots trained on your docs, FAQs, and databases, integrated into your web app.' },
                  { title: 'RAG-Powered Search', desc: 'Semantic search engines that retrieve and synthesize answers from your private knowledge base.' },
                  { title: 'Autonomous AI Agents', desc: 'Agents that browse the web, call APIs, run code, and complete multi-step tasks without supervision.' },
                  { title: 'AI-Enhanced SaaS Features', desc: 'Embedding LLM-powered features (summaries, classifications, Q&A) directly into your product.' },
                  { title: 'Local LLM Deployments', desc: 'Private, on-premise AI deployments using Ollama for compliance-sensitive environments.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4 p-5 bg-white rounded-[1.5rem] border border-slate-100 hover:shadow-md transition-all"
                  >
                    <div className="w-8 h-8 bg-[#efb036]/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
                      <FontAwesomeIcon icon={faLightbulb} className="text-[#efb036] text-sm" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#000248] text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-[#143D60] p-12 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#efb036]/10 rounded-full" />
              <div className="relative text-center">
                <FontAwesomeIcon icon={faBrain} className="text-7xl text-[#efb036] mb-8" />
                <h3 className="text-3xl font-extrabold mb-6">Ready to Add AI to Your Product?</h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-10">
                  Let&apos;s build intelligent systems that automate workflows, enhance user experience, and give your business a competitive edge.
                </p>
                <div className="space-y-4 mb-10 text-left">
                  {['Free architecture consultation', 'Open-source & API-based solutions', 'Full integration into your existing stack'].map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#48CDA0] rounded-full shrink-0" />
                      <p className="font-medium">{point}</p>
                    </div>
                  ))}
                </div>
                <Link href="/#contact-us" className="btn secondery-btn w-full h-16 font-extrabold text-xl shadow-xl shadow-[#efb03630]">
                  Let&apos;s Talk AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3b679020] to-transparent" />
        <div className="container mx-auto px-5 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="mainheading">HOW I WORK</h2>
            <h3 className="subheading">AI Development Process</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-[#3b6790]/40 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-4xl font-black text-[#3b6790]/15 italic">{String(i + 1).padStart(2, '0')}</span>
                  <FontAwesomeIcon icon={faCode} className="text-[#3b6790] text-xl opacity-60" />
                </div>
                <h4 className="text-xl font-bold text-[#000248] mb-3">{step.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="mt-5 flex justify-end">
                    <FontAwesomeIcon icon={faArrowRight} className="text-[#efb036]/40 text-lg" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Ourachivment />
    </div>
  );
};

export default AiDevelopmentPage;
