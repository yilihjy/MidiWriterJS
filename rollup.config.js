import babel from 'rollup-plugin-babel';

export default {
  input: 'src/main.js',
  output: {
    file: 'build/index.js',
    format: 'cjs'
  },
  external: ['tonal-midi'],
  plugins: [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};