import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const generatedDirectory = join(root, '.generated')
const siteUrl = (process.env.SITE_URL || 'http://localhost:4173').replace(/\/$/, '')
if (siteUrl.includes('YOUR_')) {
  throw new Error('SITE_URL cannot contain a placeholder production URL.')
}

const routeMetadata = JSON.parse(await readFile(join(root, 'content/routes.json'), 'utf8'))
const blogSlugs = ['why-practical-learning-matters', 'from-workshop-to-project', 'what-campus-learning-looks-like']
const eventSlugs = []

const routes = [
  ...routeMetadata.map(({ path }) => path),
  ...blogSlugs.map((slug) => `/learning/blog/${slug}`),
  ...eventSlugs.map((slug) => `/campus/events/${slug}`),
]

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

const documentTemplate = (path) => {
  const metadata = routeMetadata.find((route) => route.path === path) || {
    title: `${path.split('/').at(-1)} | Lords Skill Academy`,
    description: `Verified Lords Skill Academy content at ${path}.`,
  }
  const canonicalUrl = `${siteUrl}${path || '/'}`
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="icon" type="image/x-icon" href="%BASE_URL%media/favicon_io/favicon.ico" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Lords Skill Academy" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <title>${escapeHtml(metadata.title)}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`}

await rm(generatedDirectory, { recursive: true, force: true })
await mkdir(generatedDirectory, { recursive: true })

for (const route of routes) {
  const outputPath = route === '/' ? 'index.html' : join(route.slice(1), 'index.html')
  const filePath = join(generatedDirectory, outputPath)
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, documentTemplate(route))
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${siteUrl}${route || '/'}</loc></url>`).join('\n')}\n</urlset>\n`
await writeFile(join(root, 'public', 'sitemap.xml'), sitemap)
await writeFile(join(root, 'public', 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`)
