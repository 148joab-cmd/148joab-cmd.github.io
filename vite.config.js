import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" 로 두면 저장소 이름과 무관하게 GitHub Pages 하위 경로에서도 자산이 로드됩니다.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
