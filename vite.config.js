import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"Scheherazade New"', 'serif'],
        english: ['"Sawarabi Gothic"', 'sans-serif'],
        tamil: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [react(), tailwindcss(),],
})
