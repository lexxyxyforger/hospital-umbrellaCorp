"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone, Clock } from "lucide-react";

type Message = {
  id: string;
  from: "user" | "agent";
  text: string;
  time: string;
};

const QUICK_REPLIES = [
  "Cara booking dokter",
  "Jam operasional",
  "Tarif konsultasi",
  "Lokasi RS",
  "Layanan IGD",
];

const AUTO_REPLIES: Record<string, string> = {
  "booking": "Untuk booking dokter, klik tombol 'Buat Janji' di menu utama atau kunjungi halaman /appointment/book. Pilih dokter, tanggal, dan jam yang tersedia. 😊",
  "jadwal": "Jam operasional kami: Senin–Jumat 07:00–21:00, Sabtu–Minggu 08:00–18:00. IGD buka 24 jam setiap hari! 🏥",
  "jam": "Jam operasional kami: Senin–Jumat 07:00–21:00, Sabtu–Minggu 08:00–18:00. IGD buka 24 jam setiap hari! 🏥",
  "tarif": "Tarif konsultasi mulai dari Rp 150.000 – Rp 300.000 tergantung spesialis. Kami juga menerima BPJS Kesehatan. 💰",
  "harga": "Tarif konsultasi mulai dari Rp 150.000 – Rp 300.000 tergantung spesialis. Kami juga menerima BPJS Kesehatan. 💰",
  "lokasi": "RS Sehat Prima berlokasi di Jl. Kesehatan No. 1, Jakarta Selatan. Dekat Halte TransJakarta & Stasiun MRT Blok M. 📍",
  "igd": "IGD kami buka 24 jam dengan dokter jaga dan spesialis on-call. Hubungi (021) 555-1234 untuk kondisi darurat. 🚨",
  "darurat": "Untuk kondisi darurat, segera hubungi IGD kami di (021) 555-1234 atau datang langsung. Kami siaga 24 jam! 🚑",
  "bpjs": "Ya, kami menerima BPJS Kesehatan. Untuk rawat jalan, harap membawa surat rujukan dari faskes pertama (kecuali IGD). 📋",
  "ambulans": "Layanan ambulans tersedia 24 jam. Hubungi (021) 555-1234 untuk pemesanan. Respons < 15 menit untuk area Jakarta. 🚑",
};

function getAutoReply(text: string): string {
  const lower = text.toLowerCase();
  for (const [key, reply] of Object.entries(AUTO_REPLIES)) {
    if (lower.includes(key)) return reply;
  }
  return "Terima kasih atas pertanyaan Anda! Tim customer service kami sedang online dan akan segera membantu. Atau hubungi langsung di (021) 555-1234. 😊";
}

function now() {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      from: "agent",
      text: "Halo! 👋 Selamat datang di RS Sehat Prima. Ada yang bisa kami bantu?",
      time: now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), from: "user", text, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        from: "agent",
        text: getAutoReply(text),
        time: now(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          style={{ height: "460px" }}>
          {/* Header */}
          <div className="gradient-primary p-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">CS</div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold text-sm">Customer Service</div>
              <div className="text-blue-200 text-xs flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online sekarang
              </div>
            </div>
            <div className="flex gap-1">
              <a href="tel:+62215551234" className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                <Phone size={15} />
              </a>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.from === "user"
                    ? "gradient-primary text-white rounded-br-sm"
                    : "bg-white text-slate-800 border border-slate-100 shadow-sm rounded-bl-sm"
                }`}>
                  {msg.text}
                  <div className={`text-xs mt-1 ${msg.from === "user" ? "text-blue-200" : "text-slate-400"}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                  {[0, 150, 300].map((delay) => (
                    <div key={delay} className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto">
            {QUICK_REPLIES.map((qr) => (
              <button
                key={qr}
                onClick={() => sendMessage(qr)}
                className="shrink-0 px-2.5 py-1 rounded-full border border-blue-200 text-blue-600 text-xs font-medium hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ketik pesan..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl gradient-primary text-white flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full gradient-primary text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all flex items-center justify-center"
        aria-label="Chat with us"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
            1
          </span>
        )}
      </button>
    </>
  );
}
