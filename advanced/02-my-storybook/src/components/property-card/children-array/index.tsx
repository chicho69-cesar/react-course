import { Children } from 'react'

interface FadeInProps {
  children: React.ReactNode | React.ReactNode[]
}

export default function FadeIn({ children }: FadeInProps) {
  return (
    <div className='container mx-auto grid max-w-screen-lg grid-cols-3 gap-4'>
      {Children.toArray(children).map((child, index) => (
        <div
          key={index}
          style={{
            opacity: 0,
            animationDelay: `${index * 250}ms`,
            animationName: 'fadeInUp',
            animationDuration: '0.5s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
