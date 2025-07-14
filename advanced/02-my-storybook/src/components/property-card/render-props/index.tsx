'use client'

import { useState } from 'react'

interface SearchProps {
  children: (query: string) => React.ReactNode | React.ReactNode[]
  placeholder?: string
}

export default function Search({ children, placeholder = 'Search...' }: SearchProps) {
  const [query, setQuery] = useState('')

  return (
    <div className='m-auto flex max-w-screen-md flex-col gap-4'>
      <input
        className='border-input bg-background focus-visible:ring-ring mb-4 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
        placeholder={placeholder}
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {children(query)}
    </div>
  )
}
