'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
};

const CHIPS = [
    { label: '👤 About you', prompt: 'Tell me about yourself' },
    { label: '🛠️ Tech stack', prompt: "What's your tech stack?" },
    { label: '💼 Project', prompt: 'Show me your project' },
    { label: '📍 Location', prompt: 'Where do you live?' },
    { label: '⏳ Skills', prompt: 'What are your skills?' },
    { label: '📬 Contact', prompt: "What's your contact information?" },
    // { label: '🎓 Education', prompt: 'Show me your educational background' },
];

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [status, setStatus] = useState<'ready' | 'loading'>('ready');
    const [isOpen, setIsOpen] = useState(false);
    const [chipsVisible, setChipsVisible] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    // Trap wheel events inside messages so they don't bubble to page
    useEffect(() => {
        const el = messagesRef.current;
        if (!el) return;
        const onWheel = (e: WheelEvent) => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            const atTop = scrollTop === 0 && e.deltaY < 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
            if (!atTop && !atBottom) {
                e.stopPropagation();
            }
            // Always prevent page scroll when pointer is over chat
            e.preventDefault();
            el.scrollTop += e.deltaY;
        };
        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, []);

    async function sendMessage(text: string) {
        if (!text.trim() || status !== 'ready') return;
        if (messages.length === 0) setChipsVisible(false);

        const userMsg: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: text.trim(),
        };

        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setStatus('loading');

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

            if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`);

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
                    if (!line.startsWith('0:')) continue;
                    try {
                        const token: string = JSON.parse(line.slice(2));
                        setMessages(prev =>
                            prev.map(m => m.id === assistantId ? { ...m, content: m.content + token } : m)
                        );
                    } catch { }
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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await sendMessage(input);
    }

    function handleOpen() {
        setIsOpen(o => !o);
        if (!isOpen && messages.length === 0) setChipsVisible(true);
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@600;700&display=swap');

                .chat-fab {
                    position: fixed;
                    bottom: 24px; right: 24px; z-index: 1000;
                    width: 52px; height: 52px; border-radius: 14px;
                    background: #111; border: 1px solid #e5e7eb; color: #fff;
                    cursor: pointer; display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
                    outline: none;
                }
                .chat-fab:hover { transform: translateY(-2px); background: #222; }
                .chat-fab:active { transform: translateY(0); }

                .chat-widget {
                    position: fixed;
                    bottom: 88px; right: 24px; z-index: 999;
                    width: 460px; height: 540px;
                    background: #fff;
                    border: 1px solid #e5e7eb; border-radius: 20px;
                    display: flex; flex-direction: column;
                    /* overflow:hidden clips border-radius but we handle scroll ourselves */
                    overflow: hidden;
                    box-shadow: 0 8px 40px rgba(0,0,0,0.12);
                    transform-origin: bottom right;
                    transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease;
                    font-family: 'DM Mono', monospace;
                }
                .chat-widget.closed { transform: scale(0.85) translateY(8px); opacity: 0; pointer-events: none; }
                .chat-widget.open   { transform: scale(1) translateY(0); opacity: 1; }

                @media (max-width: 480px) {
                    .chat-fab { bottom: 16px; right: 16px; }
                    .chat-widget {
                        right: 0; left: 0; bottom: 0;
                        width: 100%; height: 100dvh;
                        border-radius: 0;
                        border-left: none; border-right: none; border-bottom: none;
                    }
                    .chat-widget.closed { transform: translateY(100%); }
                    .chat-widget.open  { transform: translateY(0); }
                }

                /* Header */
                .chat-header {
                    flex-shrink: 0;
                    padding: 14px 16px;
                    border-bottom: 1px solid #f0f0f0;
                    display: flex; align-items: center; gap: 10px;
                    background: #fff;
                }
                .chat-header-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e66; flex-shrink: 0; }
                .chat-header-title { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: #111; letter-spacing: 0.04em; text-transform: uppercase; flex: 1; }
                .header-actions { display: flex; align-items: center; gap: 4px; }
                .chat-header-close { background: none; border: none; color: #aaa; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; border-radius: 6px; transition: color 0.15s, background 0.15s; }
                .chat-header-close:hover { color: #555; background: #f5f5f5; }

                /*
                 * THE SCROLL FIX:
                 * flex:1 + min-height:0 makes this fill remaining space and shrink.
                 * overflow-y:scroll keeps the scrollbar track always present.
                 * The wheel event is intercepted in JS to prevent page scroll.
                 */
                .chat-messages {
                    flex: 1;
                    min-height: 0;
                    overflow-y: scroll;
                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior: contain;
                    padding: 14px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    background: #fafafa;
                    scrollbar-width: thin;
                    scrollbar-color: #e0e0e0 transparent;
                }
                .chat-messages::-webkit-scrollbar { width: 4px; }
                .chat-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }

                .chat-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; margin: auto; }
                .chat-empty-label { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: #111; }
                .chat-empty-sub { font-size: 11px; color: #bbb; letter-spacing: 0.03em; }

                .chat-bubble { max-width: 85%; padding: 10px 13px; border-radius: 14px; font-size: 13px; line-height: 1.6; word-break: break-word; animation: bubbleIn 0.2s ease; }
                @keyframes bubbleIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
                .chat-bubble.user { background: #111; color: #f0f0f0; align-self: flex-end; border-bottom-right-radius: 4px; }
                .chat-bubble.ai   { background: #fff; border: 1px solid #e8e8e8; color: #374151; align-self: flex-start; border-bottom-left-radius: 4px; }
                .chat-bubble.ai:empty::after { content:''; display:inline-block; width:8px; height:13px; background:#d1d5db; border-radius:1px; animation: blink 0.8s infinite; }
                @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }

                /* Chips panel */
                .chips-section {
                    flex-shrink: 0;
                    background: #fff;
                    border-top: 1px solid #f0f0f0;
                    overflow: hidden;
                    max-height: 0;
                    opacity: 0;
                    padding: 0 14px;
                    transition: max-height 0.3s ease, opacity 0.25s ease, padding 0.3s ease;
                }
                .chips-section.visible { max-height: 180px; opacity: 1; padding: 10px 14px 12px; }

                /* Chips header row with label + chevron toggle */
                .chips-header {
                    display: flex; align-items: center; justify-content: space-between;
                    margin-bottom: 8px;
                }
                .chips-label { font-size: 10px; color: #919090ff; letter-spacing: 0.06em; text-transform: uppercase; }

                /* Chevron toggle button — sits inline in chips panel */
                .chips-chevron-btn {
                    background: none; border: none; cursor: pointer;
                    padding: 2px 4px; display: flex; align-items: center; justify-content: center;
                    color: #bbb; border-radius: 4px;
                    transition: color 0.15s, background 0.15s;
                }
                .chips-chevron-btn:hover { color: #555; background: #f5f5f5; }
                /* Chevron SVG rotation: points right (>) when visible = collapse; rotates to point down when hidden (but panel is hidden so we never see it) */
                .chips-chevron-btn svg {
                    transition: transform 0.25s ease;
                    /* default: > (pointing right) = panel is open, click to collapse */
                    transform: rotate(0deg);
                }

                /* Floating re-open button — shows when chips are hidden and there are messages */
                .chips-reopen-btn {
                    flex-shrink: 0;
                    display: flex; align-items: center; gap: 6px;
                    padding: 7px 14px;
                    background: #fff;
                    border-top: 1px solid #f0f0f0;
                    border: none;
                    cursor: pointer;
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    color: #999;
                    letter-spacing: 0.04em;
                    transition: color 0.15s, background 0.15s;
                    width: 100%;
                    text-align: left;
                    border-top: 1px solid #f0f0f0;
                }
                .chips-reopen-btn:hover { color: #111; background: #fafafa; }
                /* Chevron in re-open button points down (v) = expand */
                .chips-reopen-btn svg {
                    transition: transform 0.25s ease;
                    transform: rotate(180deg);
                }

                .chips-grid { display: flex; flex-wrap: wrap; gap: 6px; }
                .chip {
                    background: #f5f5f5; border: 1px solid #e8e8e8; border-radius: 20px;
                    padding: 5px 11px; font-family: 'DM Mono', monospace; font-size: 11.5px;
                    color: #374151; cursor: pointer; white-space: nowrap; outline: none;
                    transition: background 0.15s, border-color 0.15s, transform 0.1s, color 0.15s;
                }
                .chip:hover { background: #111; color: #fff; border-color: #111; transform: translateY(-1px); }
                .chip:active { transform: translateY(0); }
                .chip:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

                /* Footer */
                .chat-footer { flex-shrink: 0; padding: 12px; border-top: 1px solid #f0f0f0; background: #fff; }
                .chat-input-row { display: flex; gap: 8px; align-items: center; background: #f5f5f5; border: 1px solid #e8e8e8; border-radius: 12px; padding: 8px 10px 8px 14px; transition: border-color 0.15s, background 0.15s; }
                .chat-input-row:focus-within { border-color: #d1d5db; background: #fff; }
                .chat-input { flex: 1; background: none; border: none; outline: none; font-family: 'DM Mono', monospace; font-size: 12.5px; color: #374151; }
                .chat-input::placeholder { color: #9ca3af; }
                .chat-input:disabled { opacity: 0.4; cursor: not-allowed; }
                .chat-send { background: #111; border: none; border-radius: 8px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; flex-shrink: 0; transition: background 0.15s, transform 0.1s; }
                .chat-send:hover:not(:disabled) { background: #333; transform: scale(1.05); }
                .chat-send:disabled { opacity: 0.25; cursor: not-allowed; transform: none; }
            `}</style>

            <button className="chat-fab" onClick={handleOpen} aria-label={isOpen ? 'Close chat' : 'Open chat'}>
                {isOpen ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em' }}>AI</span>
                )}
            </button>

            <div className={`chat-widget ${isOpen ? 'open' : 'closed'}`} aria-hidden={!isOpen}>

                <div className="chat-header">
                    <div className="chat-header-dot" />
                    <span className="chat-header-title">Ask me anything</span>
                    <div className="header-actions">
                        <button className="chat-header-close" onClick={() => setIsOpen(false)} aria-label="Close">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Scrollable messages — wheel events trapped by useEffect */}
                <div className="chat-messages" ref={messagesRef}>
                    {messages.length === 0 && (
                        <div className="chat-empty">
                            <span className="chat-empty-label">👋 Hey there!</span>
                            <span className="chat-empty-sub">Pick a topic below or ask anything</span>
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

                {/* Chips panel — visible state drives animation */}
                <div className={`chips-section${chipsVisible ? ' visible' : ''}`}>
                    <div className="chips-header">
                        <span className="chips-label">Quick questions</span>
                        {/* Chevron pointing right > = collapse (panel is open) */}
                        <button
                            className="chips-chevron-btn"
                            onClick={() => setChipsVisible(false)}
                            aria-label="Hide quick questions"
                        >
                            <svg width="13" height="13" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(90deg)', flexShrink: 0 }}>
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                    <div className="chips-grid">
                        {CHIPS.map(chip => (
                            <button
                                key={chip.prompt}
                                className="chip"
                                onClick={() => sendMessage(chip.prompt)}
                                disabled={status !== 'ready'}
                            >
                                {chip.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Re-open strip — only shown when chips hidden and conversation started */}
                {!chipsVisible && messages.length > 0 && (
                    <button
                        className="chips-reopen-btn"
                        onClick={() => setChipsVisible(true)}
                        aria-label="Show quick questions"
                    >
                        {/* Chevron pointing down v = expand */}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(90deg)', flexShrink: 0 }}>
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                        Quick questions
                    </button>
                )}

                <div className="chat-footer">
                    <form onSubmit={handleSubmit}>
                        <div className="chat-input-row">
                            <input
                                className="chat-input"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                disabled={status !== 'ready'}
                                placeholder="Ask me anything..."
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