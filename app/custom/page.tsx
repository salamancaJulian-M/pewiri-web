import { getCustom } from "@/services/get-custom";
import StrapiContent from "@/components/StrapiContent";

export default async function Custom() {
  const data = await getCustom();

  if (!data) return <p className="text-center py-20">Cargando información...</p>;

  const style = {
    cover: "relative h-[45vh] flex flex-col items-center justify-center text-white bg-cover bg-center overflow-hidden",
    textContainer: "prose prose-gray max-w-none text-gray-800 prose-p:leading-snug prose-strong:text-gray-900"
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-35 text-gray-900">
      <div
        id="hero"
        className={`${style.cover} mb-10`}
        style={{ backgroundImage: `url(${data.cover})` }}
      >
        <div className="absolute inset-0 bg-black/50 z-1"></div>
        <div className="text-center px-4 z-10">
          <h1 className="text-3xl md:text-5xl mb-4 tracking-[0.25em] uppercase font-light drop-shadow-md">
            {data.coverText}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <article className={style.textContainer}>
          <StrapiContent content={data.text} />
        </article>
      </div>

      <div className="space-y-4 p-10 bg-white">
        <p className="font-stolen font-light text-3xl text-black">Peso 300 - Light (Joyas)</p>
        <p className="font-stolen font-normal text-3xl text-black">Peso 400 - Normal</p>
        <p className="font-stolen font-bold text-3xl text-black">Peso 700 - Bold</p>
        <p className="font-stolen font-extrabold text-3xl text-black">Peso 800 - ExtraBold</p>
        <p className="font-stolen font-black text-3xl text-black">Peso 900 - Black (Máximo)</p>
      </div>
    </main>
  );
}
