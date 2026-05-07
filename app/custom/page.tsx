import { getCustom } from "@/services/get-custom";
import StrapiContent from "@/components/ui/custom/StrapiContent";
import BtnWhatsApp from "@/components/ui/BtnWhatsApp";
import BtnInstagram from "@/components/ui/BtnInstragram";
import { getContact } from "@/services/get-contact";

export default async function Custom() {
  const data = await getCustom();
  const contact = await getContact();

  if (!data) return <p className="text-center py-20">Cargando información...</p>;

  const style = {
    cover: "relative h-[45vh] flex flex-col items-center justify-center text-green-200 bg-cover bg-center rounded-lg overflow-hidden",
    textContainer: "prose prose-gray max-w-none text-green-400 prose-p:leading-snug prose-strong:text-green-600"
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-35">

      <div className="max-w-3xl mx-auto">
        <article className={style.textContainer}>
          <StrapiContent content={data.text} />
        </article>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <BtnWhatsApp number={contact.number} text={contact.message} />
        <BtnInstagram text={contact.instagram} />
      </div>
    </main>
  );
}
