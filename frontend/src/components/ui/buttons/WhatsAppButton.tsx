import { FaWhatsapp } from 'react-icons/fa6';
import Link from 'next/link';
import { CONTACT_WHATSAPP } from '@/utils/data/contact';

export const WhatsAppButton = () => {
  return (
    <Link
      href={CONTACT_WHATSAPP.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={CONTACT_WHATSAPP.label}
      className="group border border-secondary bg-primary text-secondary hover:bg-primary hover:text-secondary fixed right-5 bottom-5 z-90 inline-flex items-center rounded-full p-2.5 shadow-lg shadow-black/20 transition duration-300 hover:scale-105 "
    >
      <FaWhatsapp className="size-6 lg:size-7 stroke-1 shrink-0" />
      <span className="hidden max-w-0 overflow-hidden text-sm lg:text-base leading-none whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-50 group-hover:opacity-100 lg:inline-block">
        Escríbenos
      </span>
    </Link>
  );
};
