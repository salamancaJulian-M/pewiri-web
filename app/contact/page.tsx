import { getFAQ } from "@/services/get-faq";
import { faq } from "@/types/faq";
import BtnWhatsApp from "@/components/ui/BtnWhatsApp";
import { InstagramIcon } from "@/public/icons/InstagramIcon";
import { getContact } from "@/services/get-contact";
import BtnInstagram from "@/components/ui/BtnInstragram";

export default async function Contact() {
  const dataFAQ = await getFAQ();
  const dataContact = await getContact();

  const formatMessage = (message: string) => {
    return message.replaceAll(" ", "%20");
  };

  const formatNumber = (num: string) => {
    const cleanNum = num.toString().replace(/\D/g, '');

    const match = cleanNum.match(/^(\d{2})(\d{3})(\d{7})$/);

    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }

    return num;
  };

  const text = formatMessage(dataContact.message);
  const number = formatNumber(dataContact.number);

  return (
    <section className="max-w-6xl mx-auto p-6 py-35">
      <div className="text-center mb-24">
        <h2 className="text-4xl font-bold mb-4 text-green-600 tracking-tight">Contacta con nosotros</h2>
        <p className="text-gray-500 text-lg mb-12">Estamos a tu disposición para cualquier consulta.</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center h-[72px] px-8 bg-green-200 border border-green-200 rounded-xl w-full md:w-auto">
            <span className="text-[10px] uppercase tracking-[0.2em] text-green-400 font-semibold leading-none mb-1">Llámanos</span>
            <a href={`tel:${dataContact.number}`} className="text-xl font-bold text-green-400 hover:text-green-900 transition-colors duration-400">
              +{number}
            </a>
          </div>

          <BtnWhatsApp number={number} text={text} />
          <BtnInstagram text={dataContact.instagram} />

        </div>
      </div>

      <div className="w-full h-px bg-emerald-700 mb-20" />

      <h2 className="text-3xl font-bold mb-12 text-center text-green-600 tracking-tight">Preguntas Frecuentes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {dataFAQ.map((item: faq) => (
          <div key={item.id} className="border-l-2 border-gray-100 pl-6 hover:border-emerald-500 transition-colors duration-400">
            <h3 className="text-xl font-bold text-green-600 leading-tight mb-3">
              {item.question}
            </h3>
            <p className="text-green-400 leading-relaxed">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
