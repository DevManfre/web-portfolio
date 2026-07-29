import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    // resume.tsx (importato dai moduli sotto test) contiene JSX senza
    // `import React`: serve la transform automatic, tsconfig usa "preserve".
    esbuild: { jsx: "automatic" } as any,
    resolve: {
        alias: { "@": path.resolve(__dirname, "src") },
    },
    test: {
        environment: "node",
        include: ["src/**/*.test.ts"],
    },
});
