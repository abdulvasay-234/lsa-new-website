import { renderToString } from 'react-dom/server'
import App from './App'

export function renderRoute(pathname: string) {
  return renderToString(<App pathname={pathname} />)
}