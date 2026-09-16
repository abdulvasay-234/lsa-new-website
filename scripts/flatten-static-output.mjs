import { cp, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const generatedOutput = join(root, 'dist', '.generated')
const output = join(root, 'dist')
const routeMetadata = JSON.parse(await readFile(join(root, 'content/routes.json'), 'utf8'))
const { renderRoute } = await import(join(root, '.ssr', 'entry-server.js'))

await cp(generatedOutput, output, { recursive: true, force: true })
await rm(generatedOutput, { recursive: true, force: true })

for (const route of routeMetadata) {
	const outputPath = route.path === '/' ? 'index.html' : join(route.path.slice(1), 'index.html')
	const filePath = join(output, outputPath)
	const html = await readFile(filePath, 'utf8')
	const renderedApp = renderRoute(route.path)
	await writeFile(filePath, html.replace('<div id="root"></div>', `<div id="root">${renderedApp}</div>`))
}
