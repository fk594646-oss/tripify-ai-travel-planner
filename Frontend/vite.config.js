import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  // Demo build (npm run build:demo): relative paths and a flat dist/ folder,
  // so it works on any static host and is easy to upload by hand.
  ...(mode === 'demo' ? { base: './', build: { assetsDir: '' } } : {}),
}))
