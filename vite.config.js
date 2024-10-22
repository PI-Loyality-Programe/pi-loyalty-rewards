import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/pi-loyalty-rewards/", // Make sure this matches your repo name
});
