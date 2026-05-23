export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages } = await req.json();

    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
        {
            headers: {
                Authorization: `Bearer ${process.env.CF_API_TOKEN}`
            },
            method: 'POST',
            body: JSON.stringify({ messages })
        }
    );

    const result = await response.json();

    return Response.json({ role: 'assistant', content: result.result.response });
}