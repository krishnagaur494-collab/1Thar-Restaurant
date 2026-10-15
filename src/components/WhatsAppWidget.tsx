import React from 'react';
import { MessageSquare } from 'lucide-react';

interface WhatsAppWidgetProps {
  whatsappNumber: string;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ whatsappNumber }) => {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={`https://wa.me/${cleanNumber}?text=Hi%201Thar%20Restaurant,%20I%20would%20like%20to%20inquire%20about...`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4.5 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all group font-bold text-sm border border-emerald-500/30"
        aria-label="Chat with 1Thar Restaurant on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>
    </div>
  );
};
