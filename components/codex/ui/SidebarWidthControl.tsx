'use client'

interface SidebarWidthControlProps {
  width: number
  onChange: (width: number) => void
  theme?: string
}

export default function SidebarWidthControl({ width, onChange }: SidebarWidthControlProps) {
  return (
    <div className="px-4 pb-4 space-y-2">
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>Sidebar Width</span>
        <span>{Math.round(width)}px</span>
      </div>
      <input
        type="range"
        min={260}
        max={420}
        value={width}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-cyan-600"
      />
    </div>
  )
}


