import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy de "/api" a "https://api.estadisticasbcra.com"
      "/api": {
        target: "https://api.estadisticasbcra.com",
        changeOrigin: true, // necesario para virtual hosted sites
        rewrite: path => path.replace(/^\/api/, ""), // elimina el prefijo "/api" antes de hacer la solicitud
        secure: false, // si el destino es https y estás en desarrollo, posiblemente necesites esto en false
      },
    },
  },
});
