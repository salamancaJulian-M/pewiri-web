interface BtnClearProps {
  handleClear: () => void;
}
export default function BtnClear({ handleClear }: BtnClearProps) {
  return (
    <button
      onClick={handleClear}
      className="bg-green-200 hover:bg-green-400 hover:text-green-200 text-green-700 px-4 py-2 rounded-md transition-colors flex items-center justify-center"
      title="Limpiar"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>
    </button>
  )
}
