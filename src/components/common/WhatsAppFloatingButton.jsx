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
      className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 bg-[#25D366] text-white p-2.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group focus-ring"
      aria-label="Chat with Tory's Treats on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0" />
      <span className="text-xs sm:text-sm font-bold tracking-wide hidden sm:inline-block pr-1">
        Chat with Us
      </span>
    </a>
  );
}
