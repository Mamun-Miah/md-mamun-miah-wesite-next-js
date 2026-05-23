'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
};

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [status, setStatus] = useState<'ready' | 'loading'>('ready');
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim() || status !== 'ready') return;

        const userMsg: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: input.trim(),
        };

        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setStatus('loading');

        // Add an empty assistant bubble right away — we'll stream tokens into it
        const assistantId = crypto.randomUUID();
        setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages.map(({ role, content }) => ({ role, content })),
                }),
            });

            if (!response.ok || !response.body) {
                throw new Error(`HTTP ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() ?? '';

                for (const line of lines) {
                    // Your route emits lines like:  0:"token"
                    if (!line.startsWith('0:')) continue;

                    try {
                        // Strip the leading  0:  prefix then JSON.parse the quoted string
                        const token: string = JSON.parse(line.slice(2));
                        setMessages(prev =>
                            prev.map(m =>
                                m.id === assistantId
                                    ? { ...m, content: m.content + token }
                                    : m
                            )
                        );
                    } catch {
                        // malformed line — skip
                    }
                }
            }
        } catch (err) {
            console.error('Chat error:', err);
            setMessages(prev =>
                prev.map(m =>
                    m.id === assistantId
                        ? { ...m, content: 'Something went wrong. Please try again.' }
                        : m
                )
            );
        } finally {
            setStatus('ready');
        }
    }

    return (
        <>
            <style>{`
               @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@600;700&display=swap');

                .chat-fab {
                    position: fixed; bottom: 28px; right: 28px; z-index: 1000;
                    width: 56px; height: 56px; border-radius: 16px;
                    background: #111; border: 1px solid #e5e7eb; color: #fff;
                    cursor: pointer; display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
                    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
                    outline: none;
                }
                .chat-fab:hover { transform: translateY(-2px); background: #222; box-shadow: 0 12px 40px rgba(0,0,0,0.16); }
                .chat-fab:active { transform: translateY(0); }

                .chat-widget {
                    position: fixed; bottom: 96px; right: 28px; z-index: 999;
                    width: 360px; height: 520px; background: #ffffff;
                    border: 1px solid #e5e7eb; border-radius: 20px;
                    display: flex; flex-direction: column; overflow: hidden;
                    box-shadow: 0 8px 40px rgba(0,0,0,0.1), 0 2px 12px rgba(0,0,0,0.06);
                    transform-origin: bottom right;
                    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
                    font-family: 'DM Mono', monospace;
                }
                .chat-widget.closed { transform: scale(0.85) translateY(8px); opacity: 0; pointer-events: none; }
                .chat-widget.open { transform: scale(1) translateY(0); opacity: 1; }

                .chat-header {
                    padding: 16px 18px; border-bottom: 1px solid #f0f0f0;
                    display: flex; align-items: center; gap: 10px;
                    background: #ffffff; flex-shrink: 0;
                }
                .chat-header-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e66; flex-shrink: 0; }
                .chat-header-title { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: #111; letter-spacing: 0.04em; text-transform: uppercase; flex: 1; }
                .chat-header-close { background: none; border: none; color: #aaa; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; border-radius: 6px; transition: color 0.15s, background 0.15s; }
                .chat-header-close:hover { color: #555; background: #f5f5f5; }

                .chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; background: #fafafa; scrollbar-width: thin; scrollbar-color: #e0e0e0 transparent; }
                .chat-messages::-webkit-scrollbar { width: 4px; }
                .chat-messages::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 2px; }

                .chat-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
                .chat-empty-icon { width: 40px; height: 40px; border: 1px solid #e8e8e8; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #ccc; margin-bottom: 4px; }
                .chat-empty-text { font-size: 11px; color: #bbb; letter-spacing: 0.05em; }

                .chat-bubble { max-width: 85%; padding: 10px 13px; border-radius: 14px; font-size: 13px; line-height: 1.55; letter-spacing: 0.01em; word-break: break-word; animation: bubbleIn 0.2s ease; }
                @keyframes bubbleIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
                .chat-bubble.user { background: #111; border: none; color: #f0f0f0; align-self: flex-end; border-bottom-right-radius: 4px; }
                .chat-bubble.ai { background: #ffffff; border: 1px solid #e8e8e8; color: #374151; align-self: flex-start; border-bottom-left-radius: 4px; }
                .chat-bubble.ai:empty::after { content: ''; display: inline-block; width: 8px; height: 13px; background: #d1d5db; border-radius: 1px; animation: cursor 0.8s infinite; }
                @keyframes cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

                .chat-footer { padding: 12px; border-top: 1px solid #f0f0f0; background: #ffffff; flex-shrink: 0; }
                .chat-input-row { display: flex; gap: 8px; align-items: center; background: #f5f5f5; border: 1px solid #e8e8e8; border-radius: 12px; padding: 8px 10px 8px 14px; transition: border-color 0.15s; }
                .chat-input-row:focus-within { border-color: #d1d5db; background: #fff; }
                .chat-input { flex: 1; background: none; border: none; outline: none; font-family: 'DM Mono', monospace; font-size: 12.5px; color: #374151; letter-spacing: 0.01em; }
                .chat-input::placeholder { color: #9ca3af; }
                .chat-input:disabled { opacity: 0.4; cursor: not-allowed; }
                .chat-send { background: #111; border: none; border-radius: 8px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; flex-shrink: 0; transition: background 0.15s, transform 0.1s; }
                .chat-send:hover:not(:disabled) { background: #333; transform: scale(1.05); }
                .chat-send:disabled { opacity: 0.25; cursor: not-allowed; transform: none; }
            `}</style>

            <button className="chat-fab" onClick={() => setIsOpen(o => !o)} aria-label={isOpen ? 'Close chat' : 'Open chat'}>
                {isOpen ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                )}
            </button>

            <div className={`chat-widget ${isOpen ? 'open' : 'closed'}`} aria-hidden={!isOpen}>
                <div className="chat-header">
                    <div className="chat-header-dot" />
                    <span className="chat-header-title">Assistant</span>
                    <button className="chat-header-close" onClick={() => setIsOpen(false)} aria-label="Close">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="chat-messages">
                    {messages.length === 0 && (
                        <div className="chat-empty">
                            <div className="chat-empty-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                            </div>
                            <span className="chat-empty-text">Start a conversation</span>
                        </div>
                    )}
                    {messages.map(msg => (
                        <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                            <div className={`chat-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-footer">
                    <form onSubmit={handleSubmit}>
                        <div className="chat-input-row">
                            <input
                                className="chat-input"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                disabled={status !== 'ready'}
                                placeholder="Say something..."
                                autoComplete="off"
                            />
                            <button className="chat-send" type="submit" disabled={status !== 'ready' || !input.trim()} aria-label="Send">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}