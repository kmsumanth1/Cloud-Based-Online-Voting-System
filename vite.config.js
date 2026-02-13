import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Cloud-Based-Online-Voting-System/', //  EXACT repo name
})
