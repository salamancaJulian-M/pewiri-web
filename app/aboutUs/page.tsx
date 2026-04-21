import Image from "next/image";
import { getAboutUs } from "@/services/get-aboutUs";
import AboutContent from "@/components/AboutContent";

export default async function AcercaPage() {
  const data = await getAboutUs();

  if (!data) return <p className="text-center py-20">Cargando información...</p>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-35 text-green-600">
      <h1 className="text-4xl md:text-5xl font-serif mb-4 italic">
        {data.title}
      </h1>
      <div className="h-px w-24 bg-emerald-700 mb-16"></div>

      {/* SECCIÓN 1: About Us + Image 1 */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 mb-24 items-start">
        <div className="md:col-span-5">
          {data.image1 && (
            <div className="sticky top-24">
              <div className="relative aspect-[3/4] shadow-md overflow-hidden rounded-sm">
                <Image src={data.image1} alt="Misión" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority />
              </div>
            </div>
          )}
        </div>
        <div className="md:col-span-7">
          <AboutContent content={data.textAboutUs} />
        </div>
      </section>

      {/* SECCIÓN 2: History + Image 2 */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 mb-24 items-start">
        <div className="md:col-span-5">
          {data.image2 && (
            <div className="sticky top-24">
              <div className="relative aspect-[3/4] shadow-md overflow-hidden rounded-sm">
                <Image src={data.image2} alt="Historia" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
              </div>
            </div>
          )}
        </div>
        <div className="md:col-span-7">
          <AboutContent content={data.textHistory} />
        </div>
      </section>

      {/* SECCIÓN EQUIPO */}
      {data.imageTeam && (
        <section className="mt-32 pt-20 border-t border-gray-100 flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] mb-12 overflow-hidden rounded-sm shadow-lg">
            <Image src={data.imageTeam} alt="Equipo" fill sizes="100vw" className="object-cover object-top" />
          </div>
          <div className="max-w-3xl text-center">
            <AboutContent content={data.textTeam} />
          </div>
        </section>
      )}
    </main>
  );
}
