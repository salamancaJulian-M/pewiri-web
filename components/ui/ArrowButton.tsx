import Link from 'next/link';

export default function ArrowButton({ href, disabled, direction }: { href: string, disabled: boolean, direction: 'left' | 'right' }) {
  const isLeft = direction === 'left';

  const baseStyles = "w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-lg sm:rounded-xl transition-all shadow-sm";

  if (disabled) {
    return (
      <span className={`${baseStyles} bg-gray-100 text-gray-400 cursor-not-allowed opacity-50`}>
        {isLeft ? "←" : "→"}
      </span>
    );
  }

  return (
    <Link
      href={href}
      scroll={false}
      className={`${baseStyles} bg-green-700 text-white hover:bg-green-900 active:scale-95`}
    >
      {isLeft ? "←" : "→"}
    </Link>
  );
}
