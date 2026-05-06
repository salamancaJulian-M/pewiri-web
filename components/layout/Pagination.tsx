"use client";

import Link from "next/link";
import ArrowButton from "@/components/ui/ArrowButton";
import { useSearchParams } from "next/navigation";
import { usePaginationRange, DOTS } from "@/hooks/usePaginationRange";

export default function Pagination({ currentPage, pageCount }: { currentPage: number, pageCount: number }) {
  const searchParams = useSearchParams();
  const paginationRange = usePaginationRange(currentPage, pageCount);

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  if (currentPage === 0 || pageCount < 2) return null;

  return (
    <nav className="flex flex-col items-center gap-6 py-8 w-full max-w-full overflow-hidden" aria-label="Pagination">
      <div className="flex items-center justify-center gap-1 sm:gap-2 w-full px-2">

        <ArrowButton
          href={createPageURL(currentPage - 1)}
          disabled={currentPage === 1}
          direction="left"
        />

        <div className="flex items-center gap-1 sm:gap-2">
          {paginationRange.map((page, index) => {
            if (page === DOTS) {
              return (
                <span key={`dots-${index}`} className="w-6 text-center text-emerald-800 text-sm">
                  ...
                </span>
              );
            }

            const active = page === currentPage;

            return (
              <Link
                key={`page-${page}`}
                href={createPageURL(page)}
                scroll={false}
                aria-current={active ? "page" : undefined}
                className={`
                  w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 
                  flex items-center justify-center rounded-lg sm:rounded-xl 
                  text-xs sm:text-sm md:text-base font-bold transition-all duration-200
                  ${index > 0 && index < paginationRange.length - 1 && "hidden xs:flex sm:flex"} 
                  ${active
                    ? "bg-green-800 text-white shadow-md scale-105 z-10 !flex"
                    : "bg-green-100 text-green-700 hover:bg-green-200"}
                `}
              >
                {page.toString().padStart(2, '0')}
              </Link>
            );
          })}
        </div>

        <ArrowButton
          href={createPageURL(currentPage + 1)}
          disabled={currentPage === pageCount}
          direction="right"
        />
      </div>

      <div className="flex flex-col items-center gap-2 w-full max-w-[200px]">
        <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-green-400 font-semibold">
          {currentPage} / {pageCount}
        </p>
        <div className="h-1 w-full bg-green-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 transition-all duration-500"
            style={{ width: `${(currentPage / pageCount) * 100}%` }}
          />
        </div>
      </div>
    </nav>
  );
}

