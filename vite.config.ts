import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts", // 라이브러리 진입점
      name: "check4react",
      fileName: (format) => `check4react.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      // 외부 라이브러리 정의
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  plugins: [react(), dts()],
});
