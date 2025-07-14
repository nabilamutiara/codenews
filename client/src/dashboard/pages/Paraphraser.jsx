import React, { useState, useEffect, useRef } from 'react';

function Paraphraser() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = 'AIzaSyCTAjc8nwApgy5qUCHJJ-RKHBZgmK_XPp4'; 
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: trimmed }] }],
        }),
      });

      const data = await res.json();
      if (!data.candidates || !data.candidates.length) {
        throw new Error('No response from Gemini API');
      }

      const botText = data.candidates[0].content.parts[0].text;
      const botMsg = { sender: 'bot', text: botText };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, I cannot respond now. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-screen bg-white text-black">
      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-24"> {/* Added pb-24 for input space */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-3xl px-4 py-2 rounded-lg ${
              msg.sender === 'user'
                ? 'bg-sky-400 text-white self-end ml-auto'
                : 'bg-gray-100 text-black self-start mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="text-sm italic text-gray-500">Bot is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Floating Input Area */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg border border-gray-200 p-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2 items-end"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={1}
              placeholder="Write your message here...."
              className="flex-1 resize-none p-3 rounded-lg bg-gray-50 text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
            />
            <button
              type="submit"
              className="mb-1 px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center h-12"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Paraphraser;