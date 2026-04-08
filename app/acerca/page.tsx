import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getAboutUs } from "@/services/get-aboutUs";

export default async function AcercaPage() {
  const data = await getAboutUs();

  const style = "prose-lg prose-emerald max-w-none text-gray-700 font-light prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-xl prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-bold";

  if (!data) return <p className="text-center py-20">Cargando información...</p>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-35 text-gray-900">
      <h1 className="text-4xl md:text-5xl font-serif mb-4 italic">
        {data.title}
      </h1>
      <div className="h-px w-24 bg-emerald-700 mb-16"></div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
        <div className="md:col-span-5 space-y-12">
          {[data.image1, data.image2, data.image3].map((img, i) => (
            img && (
              <div key={i} className="relative aspect-[3/4] shadow-md overflow-hidden rounded-sm">
                <Image src={img} alt={`Historia ${i + 1}`} fill className="object-cover" />
              </div>
            )
          ))}
        </div>

        <div className="md:col-span-7">
          <article className={`${style}`}>
            <BlocksRenderer content={data.textAboutUs} />
          </article>
        </div>
      </div>
      
      {data.imageTeam && (
        <section className="mt-32 pt-20 border-t border-gray-100 flex flex-col items-center">
            <div className="relative w-full h-[500px] mb-12 overflow-hidden rounded-sm shadow-lg">
                <Image src={data.imageTeam} alt="Equipo" fill className="object-cover" />
            </div>
            <article className={`${style}`}>
                <BlocksRenderer content={data.textTeam} />
            </article>
        </section>
      )}
    </main>
  );
}