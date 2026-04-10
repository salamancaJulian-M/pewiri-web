import { getHomeInfo } from "@/services/get-home-info";

export default async function Hero() {
  const strapiData = await getHomeInfo()
  const { image, title, description } = strapiData

  const style = {
    hero: "relative h-[80vh] flex flex-col items-center justify-center text-white bg-cover bg-center",
  };

  return (
    <div id="hero" className={style.hero} style={{ backgroundImage: `url(${image})` }}>
      <div className="absolute inset-0 bg-black/80 z-1"> </div>

      <div className="text-center px-4 z-10">
        <h1 className="text-5xl font-serif mb-4">{title}</h1>
      </div>
      <div className="text-center px-4 z-10">
        <p className="text-xl max-w-2xl tracking-wide">{description}</p>
      </div>
    </div>
  );
}
