"use client";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import Image from 'next/image';
import { STRAPI_HOST } from "@/lib/config";

export default function StrapiContent({ content }: { content: BlocksContent }) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h1 className="text-4xl text-center font-light uppercase tracking-[0.25em] mb-4 ">{children}</h1>;
            case 2:
              return <h2 className="text-3xl font-light mt-12 mb-6">{children}</h2>;
            case 3:
              return <h3 className="text-xl font-light uppercase tracking-[0.25em] text-green-600 mb-4">{children}</h3>;
            default:
              return <h4 className="font-bold text-green-900 mb-2">{children}</h4>;
          }
        },
        image: ({ image }) => {
          const fullUrl = image.url.startsWith("http")
            ? image.url
            : `${STRAPI_HOST}${image.url}`;
          return (
            <div className="relative my-12 w-full aspect-[16/7] md:aspect-[21/9] overflow-hidden rounded-lg">
              <Image
                src={fullUrl}
                alt={image.alternativeText || "Joyas Pewiri"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover transition-transform hover:scale-[1.01] duration-500"
              />
            </div>
          )
        },
        list: ({ children, format }) => {
          const className = "pl-8 my-6 space-y-3 text-base";
          return format === "ordered"
            ? <ol className={`${className} list-decimal marker:font-bold`}>{children}</ol>
            : <ul className={`${className} list-disc marker:text-emerald-700`}>{children}</ul>;
        },
      }}
    />
  );
}
