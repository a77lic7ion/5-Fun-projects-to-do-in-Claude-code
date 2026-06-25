import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, MessageSquare, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm your Claude Code learning assistant. If you get stuck on a Windows command or don't understand a concept, just ask!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.filter(m => m.role === 'user' || m.role === 'model') // Filter out temporary UI elements if any
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: `**Error:** ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "**Error:** Failed to connect to the assistant." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all z-50",
          isOpen 
            ? "bg-slate-700 hover:bg-slate-600 text-white" 
            : "bg-blue-600 hover:bg-blue-500 text-white"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[320px] h-[400px] bg-[#1E293B] border border-[#334155] rounded-[12px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden z-50">
          <div className="p-3 bg-[#1E293B] border-b border-[#334155] flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-white">GEMINI TUTOR</span>
            </div>
            <span className="text-xs text-slate-400">Online</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 text-xs space-y-3">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex flex-col max-w-[85%]",
                  msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div 
                  className={cn(
                    "p-3 rounded-lg text-sm",
                    msg.role === 'user' 
                      ? "bg-blue-600 text-white" 
                      : "bg-slate-700 text-slate-200"
                  )}
                >
                  <div className="markdown-body prose prose-sm prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-sm ml-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-[#334155] bg-[#1E293B]">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your coding error..."
                disabled={isLoading}
                className="flex-1 bg-[#0F172A] border border-[#334155] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-blue-500 text-white p-2 rounded disabled:opacity-50 hover:bg-blue-400 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
