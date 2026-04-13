import { WhatsAppIcon } from "@/public/icons/WhatsAppIcon"
interface whatsappData {
  number: string,
  text: string
}
export default function BtnWhatsApp({ number, text }: whatsappData) {
  return (
    <a
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center gap-3 bg-green-700 hover:bg-green-600 text-green-200 px-8 h-[72px] rounded-xl font-medium transition-all duration-300 w-full md:w-auto active:scale-95 shadow-sm"
    >
      <WhatsAppIcon className="w-5 h-5 transition-transform duration-400 group-hover:scale-110" />
      <span>WhatsApp</span>
    </a>
  )
};
