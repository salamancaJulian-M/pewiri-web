import { getHomeInfo } from "@/lib/get-home-info";
import Image from "next/image";

export default async function Home() {
  const strapiData = await getHomeInfo()
  const {image, title, description} = strapiData
  console.log(strapiData);
  
  return (
    <main>
      <Image
      src={image}
      width={500}
      height={500}
      alt="emerald"
      />
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
    );
}
