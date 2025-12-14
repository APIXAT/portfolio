'use client'

import { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`bg-discord-card border border-discord-border rounded-lg p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}


