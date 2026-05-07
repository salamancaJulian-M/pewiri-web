export default function MessageError({ message }: { message: string }) {
  return (
    <div className="mt-6 p-4 rounded-md border-l-4 bg-red-50 border-red-400 text-red-800 print:hidden flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}
