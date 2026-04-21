import Image from "next/image";
import AboutContent from "./AboutContent";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

export default function SectionAbout({ image, content }: { image: string | null, content: BlocksContent }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 mb-24 items-start">
      <div className="md:col-span-5">
        {image && (
          <div className="sticky top-24">
            <div className="relative aspect-[3/4] shadow-md overflow-hidden rounded-sm">
              <Image src={image} alt="Misión" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority />
            </div>
          </div>
        )}
      </div>
      <div className="md:col-span-7">
        <AboutContent content={content} />
      </div>
    </section>
  );
}
