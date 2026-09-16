import type { ElementType, PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren<{ className?: string }>

type SectionProps = LayoutProps & {
  as?: ElementType
  id?: string
}

export function Container({ children, className = '' }: LayoutProps) {
  return <div className={`container ${className}`.trim()}>{children}</div>
}

export function Section({ children, as: Component = 'section', className = '', id }: SectionProps) {
  return <Component id={id} className={`section ${className}`.trim()}>{children}</Component>
}

export function Stack({ children, className = '' }: LayoutProps) {
  return <div className={`stack ${className}`.trim()}>{children}</div>
}

export function Grid({ children, className = '' }: LayoutProps) {
  return <div className={`grid ${className}`.trim()}>{children}</div>
}
