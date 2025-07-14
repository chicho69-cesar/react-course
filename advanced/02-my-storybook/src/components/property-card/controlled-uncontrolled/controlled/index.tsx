import type { TabItem } from '../../../../types'

interface TabsProps {
  value: TabItem[]
  selected: number
  onChange: (index: number) => void
}

export default function Tabs({ onChange, selected, value }: TabsProps) {
  return (
    <div className='bg-card/50 flex w-full flex-col gap-6 overflow-hidden rounded-2xl p-4 shadow-xl'>
      {/* Tab Titles */}
      <div className='flex h-10 gap-4'>
        {value.map((tab, idx) => (
          <button
            key={tab.title}
            className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              idx === selected
                ? 'text-foreground bg-foreground/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 bg-transparent'
            } `}
            type='button'
            onClick={() => onChange(idx)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='grid grid-cols-3 gap-4'>
        {value[selected]?.content}
      </div>
    </div>
  )
}