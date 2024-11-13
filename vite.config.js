import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve:{
    alias: {
      '@components': `${path.resolve(__dirname, './src/components/')}`,
      '@pages': `${path.resolve(__dirname, './src/pages/')}`,
      '@layouts': `${path.resolve(__dirname, './src/layouts/')}`,
      '@services': `${path.resolve(__dirname, './src/services/')}`,
      '@assets': `${path.resolve(__dirname, './src/assets/')}`,
      '@constants': `${path.resolve(__dirname, './src/constants/')}`,
      '@helpers': `${path.resolve(__dirname, './src/helpers/')}`,
    }
  },
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
})