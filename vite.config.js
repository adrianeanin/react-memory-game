import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Make sure this port matches the one you are trying to access
    host: "0.0.0.0", // Allow connections from all hosts
  },
});
