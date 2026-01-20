import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: false,
  target: "node18",
  banner: {
    js: "#!/usr/bin/env node",
  },
});
