import { defineConfig } from 'vite'
// import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { copyFileSync } from 'fs'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.json',
      include: ['src'],
      entryRoot: 'src',
      // Bundle every declaration into a single dist/index.d.ts. The per-file
      // output kept extensionless relative imports ('./core', '.vue'), which
      // don't resolve under moduleResolution node16/nodenext (issue #14).
      rollupTypes: true,
      afterBuild: () => {
        // CommonJS consumers need a .d.cts so TypeScript doesn't treat the
        // types for the `require` entry as ESM.
        copyFileSync(resolve(__dirname, 'dist/index.d.ts'), resolve(__dirname, 'dist/index.d.cts'))
      }
    })
  ],
  build: {
    target: 'esnext',
    lib: {
      name: '@meersagor/wavesurfer-vue',
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: `@meersagor-wavesurfer-vue`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        'vue',
        'wavesurfer.js',
        /^wavesurfer\.js\/.*/
      ],
      input: {
        main: resolve(__dirname, 'src/index.ts')
      },
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'wavesurfer.js': 'WaveSurfer'
        }
      }
    }
  }
})
