import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/PortafolioDual/',
  build: {
    target: 'es2020',
    cssTarget: ['chrome111', 'edge111', 'firefox128', 'safari16.4'],
  },
  plugins: [
    tailwindcss(),
    react()
  ],
})
