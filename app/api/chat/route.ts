/* eslint-disable @typescript-eslint/no-explicit-any */
export const runtime = 'edge';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SYSTEM_MESSAGE = {
    role: 'system',
    content: `You are an AI assistant for Mamun Miah. Answer questions about him using only the context below. If something isn't covered, say "I don't have that info — feel free to email Mamun directly."
        If a question is not about Mamun (e.g. coding help, general knowledge, math, writing, etc.), respond with:
        "I'm only here to answer questions about Mamun Miah. For anything else, feel free to reach out to him directly via email."
        If asked Hi / Hello / Hi there / etc, respond with:
        "Hello! I am a AI assistant for Mamun Miah. How can I help you with Mamun Miah today?"
        If asked what's your name? respond with: "I’m the AI assistant for Mamun Miah’s website."
        Rules:
        - Reply concisely in 1-3 sentences
        - Do not introduce yourself or state that you are an AI assistant when answering questions about Mamun (e.g. do not start with "I'm the AI assistant..."). Answer directly.
        - No greetings, filler phrases, or restating the question
        - For projects, include the live URL when relevant
        - For contact, lead with email: mamun.miah.dev@gmail.com
        - Never invent info not listed in the context`,
} as const;

const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

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
                max_tokens: 300,
            }),
        }
    );

    if (res.status === 429 || res.status === 403 || !res.ok) {
        throw new Error(`CF_ERROR:${res.status}`);
    }

    return res;
}
async function getEmbeddingCF(accountId: string, token: string, text: string): Promise<number[]> {
    const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/baai/bge-m3`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: [text],
            }),
        }
    );

    if (res.status === 429 || res.status === 403 || !res.ok) {
        throw new Error(`CF_EMBEDDING_ERROR:${res.status}`);
    }

    const data = await res.json();
    if (!data.success || !data.result?.data?.[0]) {
        throw new Error(`CF_EMBEDDING_FAILED`);
    }

    return data.result.data[0];
}

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Extract latest user question for logging and retrieval
    const lastUserMsg = [...messages].reverse().find((m: any) => m.role === 'user');
    const userQuestion = lastUserMsg?.content ?? '';

    // 1. Generate query embedding from user question
    let queryEmbedding: number[] | null = null;
    for (const account of CF_ACCOUNTS) {
        if (!account.id || !account.token) continue;
        try {
            queryEmbedding = await getEmbeddingCF(account.id, account.token, userQuestion);
            break; // success
        } catch (err: any) {
            console.warn(`CF embedding account ${account.id} failed (${err.message}), trying next...`);
        }
    }

    // 2. Fetch matched documents from Supabase vector search
    let contextText = '';
    if (queryEmbedding) {
        try {
            const { data: matchedDocs, error } = await supabase.rpc('match_documents', {
                query_embedding: queryEmbedding,
                match_threshold: 0.3, // search similarity threshold
                match_count: 3,       // number of documents to retrieve
            });

            if (!error && matchedDocs && matchedDocs.length > 0) {
                contextText = matchedDocs.map((doc: any) => doc.content).join('\n\n');
            } else if (error) {
                console.error('Supabase match_documents RPC error:', error.message);
            }
        } catch (err) {
            console.error('Error fetching matched documents:', err);
        }
    }

    // 3. Dynamically construct system message with retrieved context
    let systemContent = SYSTEM_MESSAGE.content;
    if (contextText) {
        systemContent += `\n\nRetrieved Context:\n${contextText}`;
    }

    const dynamicSystemMessage = {
        role: 'system',
        content: systemContent,
    };

    const payload = [dynamicSystemMessage, ...messages];

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