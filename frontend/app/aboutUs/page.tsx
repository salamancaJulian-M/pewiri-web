import Image from "next/image";
import { getAboutUs } from "@/services/get-aboutUs";
import AboutContent from "@/components/ui/aboutUs/AboutContent";
import SectionAbout from "@/components/ui/aboutUs/SectionAbout";

export default async function AcercaPage() {
  const data = await getAboutUs();

  if (!data) return <p className="text-center py-20">Cargando información...</p>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-35 text-green-600">
      <h1 className="text-4xl md:text-5xl font-serif mb-4 italic">
        {data.title}
      </h1>
      <div className="h-px w-24 bg-emerald-700 mb-16"></div>

      <SectionAbout image={data.image1} content={data.textAboutUs} />

      <SectionAbout image={data.image2} content={data.textHistory} />

      {data.imageTeam && (
        <section className="mt-32 pt-20 border-t border-gray-100 flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] mb-12 overflow-hidden rounded-sm shadow-lg">
            <Image src={data.imageTeam} alt="Equipo" fill sizes="100vw" className="object-cover object-top" />
          </div>
          <div className="max-w-3xl">
            <AboutContent content={data.textTeam} />
          </div>
        </section>
      )}
    </main>
  );
}
