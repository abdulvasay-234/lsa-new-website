import react from '@vitejs/plugin-react'
import { globSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const generatedDirectory = resolve(fileURLToPath(new URL('.', import.meta.url)), '.generated')
const routeInputs = Object.fromEntries(
  globSync(resolve(generatedDirectory, '**/*.html')).map((file) => [
    relative(generatedDirectory, file).replace(/\.html$/, ''),
    file,
  ]),
)

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || './',
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(process.env.SITE_URL || ''),
  },
  build: {
    rollupOptions: {
      input: routeInputs,
    },
  },
})
