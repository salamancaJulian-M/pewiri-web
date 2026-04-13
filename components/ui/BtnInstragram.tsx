import { InstagramIcon } from "@/public/icons/InstagramIcon";
export default function BtnInstagram({ text }: { text: string }) {
  return (
    <a
      href={`${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-900 hover:border-emerald-700 hover:text-emerald-900 px-8 h-[72px] rounded-xl font-medium transition-all duration-300 w-full md:w-auto active:scale-95 shadow-sm"
    >
      <InstagramIcon className="w-5 h-5 transition-transform duration-400 group-hover:scale-110" />
      <span>Instagram</span>
    </a>
  );
}

