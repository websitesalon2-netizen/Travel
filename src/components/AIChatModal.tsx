import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  X,
  Send,
  Compass,
  MessageCircle,
  CheckCircle,
  HelpCircle,
  Loader2
} from 'lucide-react';

export const AIChatModal: React.FC = () => {
  const { activeChatModal, setActiveChatModal, businessInfo } = useApp();

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Salaam & Welcome to Kashmiré Voyages! I am your AI Kashmir Travel Concierge. Ask me anything about Gulmarg Gondola slots, live snow in Apharwat, Dal Lake houseboats, traditional Wazwan dishes, or custom itineraries.`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeChatModal) {
      scrollToBottom();
    }
  }, [messages, activeChatModal]);

  if (!activeChatModal) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userMsg = inputText.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: messages.slice(-6)
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('API chat offline, using smart local concierge fallback:', err);
    }

    // Smart Local Fallback Response based on keywords
    let reply = `In Kashmir, our hospitality motto is 'Mehman-Nawazi'. For your query regarding "${userMsg}", our local concierge desk in Shalina, Budgam recommends booking verified mountain transport and advance Gondola Phase 2 slots. You can also message our human concierge directly on WhatsApp at ${businessInfo.phone}.`;

    const lower = userMsg.toLowerCase();
    if (lower.includes('gondola') || lower.includes('phase')) {
      reply = `Gulmarg Gondola Phase 1 (Kongdoori, 8,530 ft) and Phase 2 (Apharwat Peak, 13,780 ft) require advance online tickets. Phase 2 opens strictly subject to wind and snow clearance. We recommend booking Phase 2 tickets at least 15-20 days in advance, or let our booking concierge assist you!`;
    } else if (lower.includes('snow') || lower.includes('winter') || lower.includes('december') || lower.includes('january')) {
      reply = `Winter in Gulmarg and Sonamarg typically receives fresh Himalayan powder snow starting mid-December through late February. The snow depth on Apharwat Peak often exceeds 6 to 10 feet, making it India's premier skiing destination. Remember to carry waterproof snow boots and thermals!`;
    } else if (lower.includes('wazwan') || lower.includes('food') || lower.includes('dish')) {
      reply = `The royal Kashmiri Wazwan is a culinary masterpiece of up to 36 dishes. Key highlights include Rogan Josh (tender mutton in Kashmiri mawal blossoms), Gushtaba (silky mutton meatballs in yogurt gravy), Rista, and Tabak Maaz. We also arrange authentic 4-person copper Traem banquets in your luxury houseboat!`;
    } else if (lower.includes('sim') || lower.includes('network') || lower.includes('phone')) {
      reply = `Important Note: Prepaid SIM cards issued outside Jammu & Kashmir do NOT work in J&K due to national security regulations. Only Postpaid SIMs (Jio, Airtel, BSNL) work seamlessly. Alternatively, you can buy a local tourist SIM card at Srinagar International Airport upon arrival using your Aadhaar card or Passport.`;
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-50 p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-[#0f4332]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#0f231b] flex items-center gap-2">
                Kashmir Trip Intelligence AI
              </h3>
              <p className="text-[10px] text-[#b88628] font-bold uppercase tracking-wider">
                Powered by Gemini & Kashmiré Voyages Local Knowledge
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveChatModal(false)}
            className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message stream */}
        <div className="flex-grow p-4 space-y-3 overflow-y-auto text-xs bg-slate-50/50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl ${
                  m.role === 'user'
                    ? 'bg-[#0f4332] text-white font-medium rounded-br-none shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none leading-relaxed shadow-2xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 text-[#0f4332] p-3 rounded-2xl rounded-bl-none flex items-center gap-2 shadow-2xs">
                <Loader2 className="w-4 h-4 animate-spin text-[#0f4332]" />
                <span className="text-slate-700 font-medium">Consulting mountain weather & valley guides...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex gap-2 overflow-x-auto text-[11px] whitespace-nowrap">
          {[
            'Is Phase 2 Gondola open?',
            'Best time for snow?',
            'Prepaid vs Postpaid SIM?',
            'Houseboat vs Hotel?'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setInputText(prompt);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 cursor-pointer shadow-2xs font-medium transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about snow, hotels, passes, or food..."
            className="flex-grow px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#0f4332] shadow-2xs"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="btn-luxury px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center cursor-pointer disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
