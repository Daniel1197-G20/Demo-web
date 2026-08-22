import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { createWhatsAppUrl } from '../../lib/formatters';

export default function WhatsAppFloatingButton({
  message = "Hello Tory's Treats! I would like to inquire about your freshly baked treats & catering services.",
}) {
  const url = createWhatsAppUrl(BRAND.whatsappNumber, message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group"
      aria-label="Chat with Tory's Treats on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current shrink-0" />
      <span className="text-xs sm:text-sm font-bold tracking-wide hidden sm:inline-block pr-1">
        Chat with Us
      </span>
    </a>
  );
}
