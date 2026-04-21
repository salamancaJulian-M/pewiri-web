"use client";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

interface RenderBodyProps {
  content: BlocksContent;
}

export default function AboutContent({ content }: RenderBodyProps) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        heading: ({ children }) => (
          <h2 className="text-4xl md:text-5xl font-serif italic text-green-600 mb-8">
            {children}
          </h2>
        ),
        paragraph: ({ children }) => (
          <p className="text-xl leading-relaxed font-light text-green-700/90 mb-6">
            {children}
          </p>
        ),
        quote: ({ children }) => (
          <blockquote className="relative my-10 pl-8 pr-4 py-2 border-l-4 border-emerald-600/30">
            <div className="text-2xl md:text-3xl font-serif italic text-green-800 leading-snug">
              {children}
            </div>
          </blockquote>
        ),
        list: ({ children }) => (
          <ul className="list-disc pl-6 mb-6 text-xl font-light text-green-700/90 space-y-2">
            {children}
          </ul>
        ),
      }}
      modifiers={{
        bold: ({ children }) => <strong className="font-bold text-green-700">{children}</strong>,
        italic: ({ children }) => <em className="italic">{children}</em>,
      }}
    />
  );
}
