import { getContact } from '@/services/get-contact';
import { WhatsAppIcon } from '@/public/icons/WhatsAppIcon'
import { InstagramIcon } from '@/public/icons/InstagramIcon'


export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const { number, message } = await getContact();

  const formatMessage = (message: string) => {
    return message.replaceAll(" ", "%20");
  };

  const text = formatMessage(message);

  return (
    <footer className="text-green-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="m-5 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="uppercase tracking-widest">
            © {currentYear} PEWIRI EMERALDS.
          </p>

          <div className="flex gap-6">
            <a href="https://www.instagram.com/pewiriemeralds/" target='_blank' className="hover:text-green-600 transition-colors transition-transform hover:scale-[1.2] duration-500">
              <span className="sr-only">Instagram</span>
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a href={`https://wa.me/${number}?text=${text}`} target='_blank' className="hover:text-green-600 transition-colors transition-transform hover:scale-[1.2] duration-500">
              <span className="sr-only">Whatsapp</span>
              <WhatsAppIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
