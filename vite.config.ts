import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          '@btn-height-default': '40px'
        },
        javascriptEnabled: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'framework'
          }

          if (id.includes('tdesign-react') || id.includes('tdesign-icons-react')) {
            return 'ui-kit'
          }

          if (id.includes('socket.io-client')) {
            return 'realtime'
          }
          
          return undefined
        }
      }
    }
  }
})
