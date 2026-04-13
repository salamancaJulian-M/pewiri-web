"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ currentPage, pageCount }: { currentPage: number, pageCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getVisiblePages = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1 || i === pageCount || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col items-center gap-6 mt-10 md:mt-16 pb-10 md:pb-20 px-4">
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 w-full">
        {/* Botón Anterior */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg border border-green-600 bg-green-200 text-green-600 disabled:opacity-0 hover:bg-green-700 hover:text-green-300 transition-all duration-300 group shrink-0 disabled:cursor-default cursor-pointer"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Contenedor de Números */}
        {visiblePages.map((page, index) => (
          page === "..." ? (
            <span key={`dots-${index}`} className="w-8 md:w-10 flex items-center justify-center text-emerald-800 font-bold">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => handlePageChange(Number(page))}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-green-600 text-[10px] md:text-sm rounded-lg font-medium transition-all duration-300 ${currentPage === page
                ? "bg-green-800 text-green-300 border-green-800 z-10 cursor-default"
                : "bg-green-300 text-green-400 hover:text-green-300 hover:border-green-700 cursor-pointer hover:bg-green-700"
                }`}
            >
              {page.toString().padStart(2, '0')}
            </button>
          )
        ))}

        {/* Botón Siguiente */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= pageCount}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg border border-green-600 bg-green-200 text-green-600 disabled:opacity-0 hover:bg-green-700 hover:text-green-300 transition-all duration-300 group shrink-0 disabled:cursor-default cursor-pointer"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Info inferior ajustable a móvil */}
      <div className="flex flex-col items-center gap-2">
        <span className="h-[1px] w-12 bg-emerald-700"></span>
        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-green-400">
          Explorando <span className="text-green-600 font-bold">{currentPage}</span> / {pageCount}
        </p>
      </div>
    </div>
  );
}
