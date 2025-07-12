import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  outDir: 'dist',
  entry: {
    index: 'src/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2022',
  ...options,
}));
