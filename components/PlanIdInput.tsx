'use client'

interface Props {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  loading: boolean
}

export default function PlanIdInput({ value, onChange, onSubmit, loading }: Props) {
  return (
    <div className="flex gap-2 items-center mb-6">
      <input
        type="number"
        placeholder="Personal Plan ID"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSubmit()}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-brand"
      />
      <button
        onClick={onSubmit}
        disabled={loading || !value}
        className="bg-brand text-white text-sm rounded-lg px-4 py-2 font-medium disabled:opacity-50 hover:bg-indigo-700 transition-colors"
      >
        {loading ? 'Loading…' : 'Go'}
      </button>
    </div>
  )
}
