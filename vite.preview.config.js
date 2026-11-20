// Builds one self-contained HTML file (dist-preview/index.html) for quick previews or simple hosting.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
export default defineConfig({ plugins: [react(), tailwindcss(), viteSingleFile()], build: { outDir: 'dist-preview' } })
