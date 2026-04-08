import { getHomeInfo } from "@/services/get-home-info";

export default async function Hero() {
  const strapiData = await getHomeInfo()
  const {image, title, description} = strapiData  

  const style = {
    hero:"relative h-[80vh] flex flex-col items-center justify-center text-white bg-cover bg-center",
  }
  
  return (
    <div id="hero" className={style.hero} style={{backgroundImage:`url(${image})`}}>
      <div className="absolute inset-0 bg-black/40 brightness-75"> </div>
      
      <div className="text-center px-4">
        <h1 className="text-5xl font-serif mb-4">{title}</h1>
        <p className="text-lg max-w-2xl font-light tracking-wide">{description}</p>
      </div>
    </div>
    );
}