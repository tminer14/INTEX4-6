import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true,
    // headers: {
    //   "Content-Security-Policy":
    //     "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data:; font-src 'self' fonts.gstatic.com data:; connect-src 'self' https://localhost:5130 https://cineniche4-6-apa5hjhbcbe8axg8.westcentralus-01.azurewebsites.net; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';",
    // },
  },
});
