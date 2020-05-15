import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';

export default {
  input: 'src/main.js',
  output: {
    file: 'build/index.js',
    format: 'cjs'
  },
  external: ['tonal-midi', 'fs'],
  plugins: [
    replace({ 'process.browser': !!process.env.BROWSER }),
    json(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
      plugins: ['@babel/plugin-transform-destructuring']
    })
  ]
};