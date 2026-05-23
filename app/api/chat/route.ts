/* eslint-disable @typescript-eslint/no-explicit-any */
export const runtime = 'edge';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SYSTEM_MESSAGE = {
    role: 'system',
    content: `You are an AI assistant for Mamun Miah. Answer questions about him using only the info below. If something isn't covered, say "I don't have that info — feel free to email Mamun directly."
        If a question is not about Mamun (e.g. coding help, general knowledge, math, writing, etc.), respond with:
        "I'm only here to answer questions about Mamun Miah. For anything else, feel free to reach out to him directly via email."
        If asked Hi / Hello / Hi there / etc, respond with:
        "Hello! I am a AI assistant for Mamun Miah. How can I help you with Mamun Miah today?"
            ## Personal
            Name: Mamun Miah
            Email: mamun.miah.dev@gmail.com
            LinkedIn: linkedin.com/in/mamun-miah-dev

            ## Summary
            Full Stack Web Developer & SEO Expert who creates engaging, optimized websites. Focused on performance, user experience, and digital visibility.

            ## Expertise
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
            - AI Chatbot Development 

            ## Tech Stack
            Frontend: React, Next.js, TypeScript, HTML, CSS3, Tailwind CSS, Bootstrap
            Backend: Node.js, PHP, Laravel, Prisma, REST APIs
            Databases: MySQL, PostgreSQL, MongoDB
            CMS: WordPress (custom themes & plugins), Headless WordPress, Shopify
            Tools: Git, GitHub, Docker, Vercel, JWT Auth, WooCommerce
            Other: SEO, Digital Marketing, Performance Optimization, CI/CD

            ## Projects
            Please visit https://github.com/Mamun-Miah for more information.

            ## Certifications & Courses
            - Professional Digital Marketing & SEO — Creative IT Institute, 2022
            - Full Stack Web Development (Level 1 & 2) — Programming Hero, 2024 (JS, Node, React, Next.js, MongoDB, MySQL, PostgreSQL, Docker)
            - Laravel — Laracast, 2022
            - ICT — National University, 2019

            ## Skills
                **Core Development:** Full Stack Web Development, WordPress & Plugin Development, Shopify Development, SEO & Digital Marketing, Performance Optimization, CI/CD, Online Marketplace Development

                **AI Specialization (Primary Focus):** 
                - AI Integration in Websites & Web Apps
                - RAG (Retrieval-Augmented Generation) Systems
                - LangChain with Python
                - Vector Databases & Embeddings (e.g. Pinecone, ChromaDB)
                - Large Language Model (LLM) Integration
                - AI Chatbot Development
                - Prompt Engineering
                - AI-Powered Full Stack Applications

            ## Rules
            - Reply concisely in 1–3 sentences
            - No greetings, filler phrases, or restating the question
            - For projects, include the live URL when relevant
            - For contact, lead with email: mamun.miah.dev@gmail.com
            - Never invent info not listed above

            ## Location
            - I lived in Dhaka, Bangladesh

            ## Education
            - I completed MBA in Accounting from National University`,
} as const;

const MODEL = '@cf/meta/llama-3-8b-instruct';

const CF_ACCOUNTS = [
    { id: process.env.CF_ACCOUNT_ID, token: process.env.CF_API_TOKEN },
    { id: process.env.CF_ACCOUNT_ID1, token: process.env.CF_API_TOKEN1 },
    { id: process.env.CF_ACCOUNT_ID2, token: process.env.CF_API_TOKEN2 },
];

async function callCF(accountId: string, token: string, messages: object[]): Promise<Response> {
    const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages,
                stream: true,
                max_tokens: 200,
            }),
        }
    );

    if (res.status === 429 || res.status === 403 || !res.ok) {
        throw new Error(`CF_ERROR:${res.status}`);
    }

    return res;
}

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Extract latest user question for logging
    const lastUserMsg = [...messages].reverse().find((m: any) => m.role === 'user');
    const userQuestion = lastUserMsg?.content ?? '';

    const payload = [SYSTEM_MESSAGE, ...messages];

    let response: Response | null = null;

    // Try each account in order — move to next on any error/limit
    for (const account of CF_ACCOUNTS) {
        if (!account.id || !account.token) continue;
        try {
            response = await callCF(account.id, account.token, payload);
            break; // success — stop trying
        } catch (err: any) {
            console.warn(`CF account ${account.id} failed (${err.message}), trying next...`);
        }
    }

    // All accounts failed — return a friendly streamed error message
    if (!response) {
        const encoder = new TextEncoder();
        const errorStream = new ReadableStream({
            start(controller) {
                const msg = 'Service is temporarily unavailable. Please try again later.';
                controller.enqueue(encoder.encode(`0:${JSON.stringify(msg)}\n`));
                controller.enqueue(encoder.encode(`e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
                controller.enqueue(encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
                controller.close();
            },
        });
        return new Response(errorStream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'X-Vercel-AI-Data-Stream': 'v1',
            },
        });
    }

    // Stream response and accumulate full answer for logging
    const encoder = new TextEncoder();
    let fullAnswer = '';

    const stream = new ReadableStream({
        async start(controller) {
            const reader = response!.body!.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() ?? '';

                for (const line of lines) {
                    if (!line.startsWith('data: ')) continue;
                    const data = line.slice(6).trim();

                    if (data === '[DONE]') {
                        // Save question + answer to Supabase
                        await supabase.from('chat_logs').insert({
                            question: userQuestion,
                            answer: fullAnswer,
                        });

                        controller.enqueue(encoder.encode(`e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
                        controller.enqueue(encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
                        controller.close();
                        return;
                    }

                    try {
                        const parsed = JSON.parse(data);
                        const token = parsed.response ?? '';
                        if (token) {
                            fullAnswer += token; // accumulate for logging
                            controller.enqueue(encoder.encode(`0:${JSON.stringify(token)}\n`));
                        }
                    } catch {
                        // skip malformed lines
                    }
                }
            }

            controller.close();
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'X-Vercel-AI-Data-Stream': 'v1',
        },
    });
}