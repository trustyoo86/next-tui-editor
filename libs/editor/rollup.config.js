// import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import css from 'rollup-plugin-css-only';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import pkg from './package.json';

const external = [
  'react',
  'react-dom',
  ...Object.keys(pkg.devDependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const plugins = [
  peerDepsExternal(),
  resolve({
    preferBuiltins: true,
    modulesOnly: true,
  }),
  typescript({
    exclude: ['*.d.ts', '**/*.d.ts'],
    sourceMap: false,
    declaration: true,
    outDir: 'dist',
  }),
  babel({
    babelrc: false,
    babelHelpers: 'bundled',
    exclude: [
      path.resolve(__dirname, '..', '..', 'node_modules'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }),
  commonjs(),
  dynamicImportVars(),
];

const rollupConfig = [
  {
    input: 'src/index.tsx',
    output: {
      dir: './dist',
      format: 'esm',
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input: '../../node_modules/@toast-ui/editor/dist/toastui-editor.css',
    output: {
      dir: './dist',
      format: 'iife',
      sourcemap: false,
    },
    plugins: [
      css({
        output: 'toastui-editor.css',
      }),
    ],
  },
];

export default rollupConfig;
