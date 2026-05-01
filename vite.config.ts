import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  // Set VITE_BASE_PATH=/repo-name/ when building for GitHub Pages project sites.
  // Leave unset (defaults to /) for custom domains or username.github.io root sites.
  base: process.env.VITE_BASE_PATH ?? '/',
})
