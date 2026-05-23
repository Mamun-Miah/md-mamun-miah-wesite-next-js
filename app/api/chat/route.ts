export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages } = await req.json();
    const systemMessage = {
        role: 'system',
        content: `You are an AI assistant for Mamun Miah. Answer questions about him using only the info below. If something isn't covered, say "I don't have that info — feel free to email Mamun directly."

            ## Personal
            Name: Mamun Miah
            Email: mamun.miah.dev@gmail.com
            LinkedIn: linkedin.com/in/mamun-miah-dev

            ## Summary
            Full Stack Web Developer & SEO Expert who creates engaging, optimized websites. Focused on performance, user experience, and digital visibility.

            ## Experience
            - Builds and deploys web apps with modern front-end and back-end technologies (25% faster dev time)
            - Headless WordPress with REST APIs (40% faster data retrieval)
            - Core Web Vitals optimization — consistently 90+ PageSpeed scores
            - Shopify stores and low-code platforms (WIX, Squarespace, Google Sites)
            - SEO strategy driving up to 50% more organic traffic
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
            Full Stack Development, WordPress & Plugin Development, Shopify Development, SEO & Digital Marketing, Performance Optimization, CI/CD, Online Marketplace Development, AI integration in websites, RAG Systems Development, Langchain with Python with vector database and embedding and chat models, LLM integration in websites, AI Chatbot Development 

            ## Rules
            - Reply concisely in 1–3 sentences
            - No greetings, filler phrases, or restating the question
            - For projects, include the live URL when relevant
            - For contact, lead with email: mahadyhasen7@gmail.com
            - Never invent info not listed above,

            ## Location
            - I lived in Dhaka, Bangladesh

            ## Education
            - I completed MBA in Accounting from National University`

    };

    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
        {
            headers: {
                Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                messages: [systemMessage, ...messages],
                stream: true,
                max_tokens: 250,
            }),
        }
    );

    // Cloudflare returns SSE lines: data: {"response":"token"}
    // AI SDK expects SSE lines: 0:"token"
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            const reader = response.body!.getReader();
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
                        // Send AI SDK finish signal
                        controller.enqueue(encoder.encode(`e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
                        controller.enqueue(encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
                        controller.close();
                        return;
                    }
                    try {
                        const parsed = JSON.parse(data);
                        const token = parsed.response ?? '';
                        if (token) {
                            // AI SDK text stream protocol: 0:"<token>"
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
            'X-Vercel-AI-Data-Stream': 'v1', // tells AI SDK this is its streaming format
        },
    });
}