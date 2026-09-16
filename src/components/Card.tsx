import type { PropsWithChildren } from 'react'

type CardProps = PropsWithChildren<{ className?: string }>

export function Card({ children, className = '' }: CardProps) {
  return <article className={`card ${className}`.trim()}>{children}</article>
}

export function CardHeader({ children, className = '' }: CardProps) {
  return <header className={`card-header ${className}`.trim()}>{children}</header>
}
