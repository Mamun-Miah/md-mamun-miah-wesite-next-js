/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Helper to load environment variables from .env
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    throw new Error('.env file not found');
  }
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};
  envContent.split('\n').forEach(line => {
    // Strip comments
    const cleanLine = line.split('#')[0].trim();
    if (!cleanLine) return;

    const parts = cleanLine.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      env[key] = val;
    }
  });
  return env;
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;
const cfAccountId = env.CF_ACCOUNT_ID;
const cfApiToken = env.CF_API_TOKEN;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}
if (!cfAccountId || !cfApiToken) {
  console.error('Missing Cloudflare credentials in .env');
  process.exit(1);
}

// Bypass Supabase Realtime WebSocket error in Node.js < 22 by defining a mock WebSocket class
global.WebSocket = class { };

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const chunks = [
  {
    category: "personal",
    content: `## Personal & Summary
Name: Mamun Miah
Email: mamun.miah.dev@gmail.com
LinkedIn: linkedin.com/in/mamun-miah-dev
Location: Dhaka, Bangladesh

Summary: Full Stack Web Developer & SEO Expert who creates engaging, optimized websites. Focused on performance, user experience, and digital visibility.`
  },
  {
    category: "expertise",
    content: `## Expertise
- Builds and deploys web apps with modern front-end and back-end technologies
- Headless WordPress with REST APIs
- Core Web Vitals optimization 
- Shopify stores and low-code platforms (WIX, Squarespace, Google Sites)
- SEO strategy
- Zero-downtime platform and server migrations
- AI integration in websites
- RAG Systems Development
- Langchain with Python with vector database and embedding and chat models 
- LLM integration in websites
- AI Chatbot Development`
  },
  {
    category: "tech_stack",
    content: `## Tech Stack
- Frontend: React, Next.js, TypeScript, HTML, CSS3, Tailwind CSS, Bootstrap
- Backend: Node.js, PHP, Laravel, Prisma, REST APIs
- Databases: MySQL, PostgreSQL, MongoDB
- CMS: WordPress (custom themes & plugins), Headless WordPress, Shopify
- Tools: Git, GitHub, Docker, Vercel, JWT Auth, WooCommerce
- Other: SEO, Digital Marketing, Performance Optimization, CI/CD`
  },
  {
    category: "projects",
    content: `## Projects
Please visit https://github.com/Mamun-Miah for more information.`
  },
  {
    category: "certifications",
    content: `## Certifications & Courses
- Professional Digital Marketing & SEO — Creative IT Institute, 2022
- Full Stack Web Development (Level 1 & 2) — Programming Hero, 2024 (JS, Node, React, Next.js, MongoDB, MySQL, PostgreSQL, Docker)
- Laravel — Laracast, 2022
- ICT — National University, 2019`
  },
  {
    category: "skills",
    content: `## Core Development Skills
Full Stack Web Development, WordPress & Plugin Development, Shopify Development, SEO & Digital Marketing, Performance Optimization, CI/CD, Online Marketplace Development`
  },
  {
    category: "ai_specialization",
    content: `## AI Specialization Skills (Primary Focus)
- AI Integration in Websites & Web Apps
- RAG (Retrieval-Augmented Generation) Systems
- LangChain with Python
- PEFT: LoRA, QLoRA
- Fine-tuning Open-Source LLMs
- Vector Databases & Embeddings (e.g. Pinecone, ChromaDB)
- Large Language Model (LLM) Integration
- AI Chatbot Development
- Prompt Engineering
- AI-Powered Full Stack Applications`
  },
  {
    category: "rules",
    content: `## Chatbot Rules
- Reply concisely in 1–3 sentences
- No greetings, filler phrases, or restating the question
- For projects, include the live URL when relevant
- For contact, lead with email: mamun.miah.dev@gmail.com
- Never invent info not listed above`
  },
  {
    category: "education",
    content: `## Education
- I completed MBA in Accounting from National University`
  }
];

async function getEmbedding(text) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/@cf/baai/bge-m3`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cfApiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudflare AI API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(`Cloudflare AI API request failed: ${JSON.stringify(data.errors)}`);
  }

  const embedding = data.result.data[0];
  if (!embedding) {
    throw new Error('No embedding returned from Cloudflare AI API');
  }

  return embedding;
}

async function seed() {
  console.log('Starting DB Seeding...');

  // 1. Delete all existing documents to avoid duplication
  console.log('Clearing existing documents from Supabase...');
  const { error: deleteError } = await supabase
    .from('documents')
    .delete()
    .neq('id', 0); // deletes all rows

  if (deleteError) {
    throw new Error(`Failed to clear documents: ${deleteError.message}`);
  }
  console.log('Successfully cleared documents.');

  // 2. Process each chunk
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`[${i + 1}/${chunks.length}] Generating embedding for category: "${chunk.category}"...`);

    try {
      const embedding = await getEmbedding(chunk.content);

      console.log(`Inserting chunk into Supabase...`);
      const { error: insertError } = await supabase
        .from('documents')
        .insert({
          content: chunk.content,
          embedding: embedding,
          category: chunk.category,
        });

      if (insertError) {
        throw new Error(`Insert failed for category "${chunk.category}": ${insertError.message}`);
      }

      console.log(`Saved successfully!`);
    } catch (err) {
      console.error(`Error processing chunk for category "${chunk.category}":`, err.message);
      process.exit(1);
    }
  }

  console.log('\nDB Seeding completed successfully!');
}

seed().catch(err => {
  console.error('Fatal error during seeding:', err);
  process.exit(1);
});
