import { getContact } from '@/services/get-contact';
import {WhatsAppIcon} from '@/public/icons/WhatsAppIcon'
import {InstagramIcon} from '@/public/icons/InstagramIcon'


export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const {number, message} = await getContact();

  const formatMessage = (message : string) => {
    return message.replaceAll(" ", "%20");
  };

  const text = formatMessage(message);
  
  return (
    <footer className="text-gray-800 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-5">
        {/* Línea final y RRSS */}
        <div className="m-5 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs uppercase tracking-widest">
            © {currentYear} PEWIRI EMERALDS.
          </p>
          
          <div className="flex gap-6">
            <a href="https://www.instagram.com/pewiriemeralds/" className="hover:text-emerald-700 transition-colors">
              <span className="sr-only">Instagram</span>
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href={`https://wa.me/${number}?text=${text}`} className="hover:text-emerald-700 transition-colors">
              <span className="sr-only">Whatsapp</span>
              <WhatsAppIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}