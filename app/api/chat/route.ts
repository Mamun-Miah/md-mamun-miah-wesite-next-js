export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages } = await req.json();
    const systemMessage = {
        role: 'system',
        content: `Your name is Mamun & you are his Chat Assistant.  Rules:
        - Always reply concise answer
        - No restating the question before answering
        - If the answer is one line, that's fine`,
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