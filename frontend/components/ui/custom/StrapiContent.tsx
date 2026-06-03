"use client";

import { useState } from "react";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import Image from 'next/image';
import { STRAPI_HOST } from "@/lib/config";

const rendererComponents = {
  heading: ({ children, level }: any) => {
    switch (level) {
      case 1: return <h1 className="text-4xl text-center uppercase mb-6">{children}</h1>;
      case 2: return <h2 className="text-3xl font-light mt-12 mb-6 text-green-600">{children}</h2>;
      case 3: return <h3 className="text-xl font-light uppercase tracking-widest text-green-600 mb-4">{children}</h3>;
      default: return <h4 className="font-bold text-green-900 mb-2">{children}</h4>;
    }
  },
  image: ({ image }: any) => {
    let imageUrl = image.url;
    const fileName = imageUrl.split('/').pop();
    const mediaHost = STRAPI_HOST;
    const fullUrl = `${mediaHost}/${fileName}`;
    return (
      <div className="relative my-8 w-full aspect-[16/9] overflow-hidden rounded-lg" >
        <Image src={fullUrl} alt={image.alternativeText || "Pewiri"} fill className="object-cover rounded-lg" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" />
      </div >
    );
  },
  quote: ({ children }: any) => (
    <blockquote className="border-l-4 border-green-600 pl-5 my-8 italic text-green-800 text-lg font-light bg-green-50/50 oy-4 pr-4 rounded-r-lg">
      {children}
    </blockquote>
  ),
  list: ({ children, format }: any) => {
    const className = "pl-6 my-4 space-y-2 text-base";
    return format === "ordered"
      ? <ol className={`${className} list-decimal`}>{children}</ol>
      : <ul className={`${className} list-disc marker:text-green-600`}>{children}</ul>;
  },
};

const AccordionSection = ({ title, children }: { title: React.ReactNode, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-green-100 mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <div className="text-2xl md:text-3xl font-light transition-colors group-hover:text-green-700 text-green-400 prose-strong:text-green-700 prose-strong:font-bold">
          {title}
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[5000px] opacity-100 mb-8" : "max-h-0 opacity-0"}`}>
        <div className="pt-2 pb-4">{children}</div>
      </div>
    </div>
  );
};

export default function StrapiContent({ content }: { content: BlocksContent }) {
  const elements: React.ReactNode[] = [];
  let currentAccordionBlocks: any[] = [];
  let currentTitle: any = null;

  for (let i = 0; i < content.length; i++) {
    const block = content[i];

    if (block.type === "heading" && block.level === 2) {
      if (currentTitle && currentAccordionBlocks.length > 0) {
        elements.push(
          <div key={`normal-${i}-pre`} className="mb-4">
            <BlocksRenderer content={[currentTitle]} blocks={rendererComponents} />
            <BlocksRenderer content={currentAccordionBlocks} blocks={rendererComponents} />
          </div>
        );
      }
      currentTitle = block;
      currentAccordionBlocks = [];
    }
    else if (block.type === "image" && currentTitle) {
      currentAccordionBlocks.push(block);
      const titleCapture = (
        <BlocksRenderer content={[currentTitle]} blocks={{ ...rendererComponents, heading: ({ children }) => <>{children}</> }} />
      );

      elements.push(
        <AccordionSection key={`acc-${i}`} title={titleCapture}>
          <BlocksRenderer content={[...currentAccordionBlocks]} blocks={rendererComponents} />
        </AccordionSection>
      );

      currentTitle = null;
      currentAccordionBlocks = [];
    }
    else {
      if (currentTitle) {
        currentAccordionBlocks.push(block);
      } else {
        elements.push(
          <BlocksRenderer key={`normal-${i}`} content={[block]} blocks={rendererComponents} />
        );
      }
    }
  }

  if (currentTitle) {
    elements.push(
      <div key="last-orphan" className="mb-4">
        <BlocksRenderer content={[currentTitle, ...currentAccordionBlocks]} blocks={rendererComponents} />
      </div>
    );
  }

  return <div className="strapi-content w-full">{elements}</div>;
}
