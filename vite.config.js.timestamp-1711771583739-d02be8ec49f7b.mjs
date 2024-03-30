// vite.config.js
import { defineConfig } from "file:///C:/Users/Alberto/Dropbox/1%202024/PROGRAMACION/PROYECTO%20FINANZAS/finanzas/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Alberto/Dropbox/1%202024/PROGRAMACION/PROYECTO%20FINANZAS/finanzas/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy de "/api" a "https://api.estadisticasbcra.com"
      "/api": {
        target: "https://api.estadisticasbcra.com",
        changeOrigin: true,
        // necesario para virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ""),
        // elimina el prefijo "/api" antes de hacer la solicitud
        secure: false
        // si el destino es https y estás en desarrollo, posiblemente necesites esto en false
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBbGJlcnRvXFxcXERyb3Bib3hcXFxcMSAyMDI0XFxcXFBST0dSQU1BQ0lPTlxcXFxQUk9ZRUNUTyBGSU5BTlpBU1xcXFxmaW5hbnphc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQWxiZXJ0b1xcXFxEcm9wYm94XFxcXDEgMjAyNFxcXFxQUk9HUkFNQUNJT05cXFxcUFJPWUVDVE8gRklOQU5aQVNcXFxcZmluYW56YXNcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0FsYmVydG8vRHJvcGJveC8xJTIwMjAyNC9QUk9HUkFNQUNJT04vUFJPWUVDVE8lMjBGSU5BTlpBUy9maW5hbnphcy92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHNlcnZlcjoge1xuICAgIHByb3h5OiB7XG4gICAgICAvLyBQcm94eSBkZSBcIi9hcGlcIiBhIFwiaHR0cHM6Ly9hcGkuZXN0YWRpc3RpY2FzYmNyYS5jb21cIlxuICAgICAgXCIvYXBpXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vYXBpLmVzdGFkaXN0aWNhc2JjcmEuY29tXCIsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSwgLy8gbmVjZXNhcmlvIHBhcmEgdmlydHVhbCBob3N0ZWQgc2l0ZXNcbiAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKSwgLy8gZWxpbWluYSBlbCBwcmVmaWpvIFwiL2FwaVwiIGFudGVzIGRlIGhhY2VyIGxhIHNvbGljaXR1ZFxuICAgICAgICBzZWN1cmU6IGZhbHNlLCAvLyBzaSBlbCBkZXN0aW5vIGVzIGh0dHBzIHkgZXN0XHUwMEUxcyBlbiBkZXNhcnJvbGxvLCBwb3NpYmxlbWVudGUgbmVjZXNpdGVzIGVzdG8gZW4gZmFsc2VcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyWixTQUFTLG9CQUFvQjtBQUN4YixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQTtBQUFBLE1BRUwsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBO0FBQUEsUUFDZCxTQUFTLFVBQVEsS0FBSyxRQUFRLFVBQVUsRUFBRTtBQUFBO0FBQUEsUUFDMUMsUUFBUTtBQUFBO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
