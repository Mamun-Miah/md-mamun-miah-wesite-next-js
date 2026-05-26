# Mamun Miah Portfolio & AI Chatbot Website

A high-performance personal portfolio website built on **Next.js 15** and **React 19**, featuring a custom **RAG (Retrieval-Augmented Generation) Chatbot** powered by **Cloudflare Workers AI** and **Supabase Vector Search**.

---

## 🚀 Key Features

- **Next.js 15 App Router & React 19**: Clean, modern, server-side rendered, and highly optimized frontend architecture.
- **RAG-Powered AI Chatbot**: Integrated context-aware AI assistant leveraging Cloudflare Workers AI (`llama-3.3-70b-instruct` for generation and `bge-m3` for embeddings) with full event-stream streaming.
- **Vector Search with Supabase**: Real-time semantic similarity search built with Supabase and the `pgvector` Postgres extension.
- **Headless WordPress Integration**: Seamlessly pulls blog posts and single-post data from WordPress REST API.
- **Stunning UI/UX Animations**: Smooth interfaces designed using GSAP, Framer Motion, AOS (Animate on Scroll), Lenis for smooth scrolling, and Three.js elements.
- **DaisyUI & Tailwind CSS v4**: Beautiful, accessible, and responsive components built with clean styling tokens.

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15) & [React](https://react.dev/) (v19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Database / Vector Store**: [Supabase](https://supabase.com/) & `pgvector`
- **AI Infrastructure**: [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)
- **Animations**: [GSAP](https://gsap.com/), [Framer Motion](https://www.framer.com/motion/), [AOS](https://michalsnik.github.io/aos/)
- **API**: Headless WordPress REST API

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Mamun-Miah/md-mamun-miah-wesite-next-js.git
cd md-mamun-miah-wesite-next-js
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables Setup
Create a `.env` file in the root directory and add the following keys:
```env
# Cloudflare API Credentials
CF_ACCOUNT_ID=your_cloudflare_account_id
CF_API_TOKEN=your_cloudflare_api_token

# Backup Cloudflare credentials (Optional)
CF_ACCOUNT_ID1=your_backup_cloudflare_account_id_1
CF_API_TOKEN1=your_backup_cloudflare_api_token_1

# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 4. Supabase Database Configuration
Run the following SQL scripts in your Supabase SQL Editor to set up the vector store:

```sql
-- Enable the pgvector extension
create extension if not exists vector;

-- Create the documents table for context chunks
create table if not exists documents (
  id bigint primary key generated always as identity,
  content text not null,
  embedding vector(1024), -- 1024 dimensions for @cf/baai/bge-m3
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create the chat logs table for analytics
create table if not exists chat_logs (
  id uuid primary key default gen_random_uuid(),
  question text,
  answer text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create the vector similarity search function
create or replace function match_documents (
  query_embedding vector(1024),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  category text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    documents.category,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

### 5. Seed the Context Documents
Seed personal biography, expertise, and other context documents into the vector store:
```bash
node scripts/seed-documents.js
```

### 6. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📦 Scripts

- `npm run dev` - Starts the development server with Turbopack.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npm run lint` - Lints code with ESLint.
- `node scripts/seed-documents.js` - Clears and seeds documents to Supabase with Cloudflare embeddings.