"use client";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

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
        image: ({ image }) => (
          <div className="my-12 w-full">
            <img
              src={image.url}
              alt={image.alternativeText || "Joyas Pewiri"}
              className="w-full aspect-[16/7] md:aspect-[21/9] shadow-sm object-cover object-center rounded-lg transition-transform hover:scale-[1.01] duration-500"
            />
          </div>
        ),
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
