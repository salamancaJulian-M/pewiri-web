interface BtnSearchProps {
  handleSearch: () => void;
  loading: boolean;
}
export default function BtnSearch({ handleSearch, loading }: BtnSearchProps) {
  return (
    <button
      onClick={handleSearch}
      disabled={loading}
      className="bg-green-200 hover:bg-green-400 hover:text-green-200 text-green-700 p-2 rounded-r-md transition-colors disabled:bg-gray-400"
    >
      {loading ? 'Buscando...' : 'Consultar'}
    </button>
  )
}
