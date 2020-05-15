import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";


export default {
    input: 'src/main.js',
    output: [{
        file: 'browser/midiwriter.bundle.js',
        format: 'iife',
        name: 'MidiWriter'
    }, {
        file: 'browser/midiwriter.bundle.min.js',
        format: 'iife',
        name: 'MidiWriter',
        plugins: [terser()]
    }, {
        file: 'browser/index.mjs',
        format: 'esm',
    }
    ],
    plugins: [
        replace({ 'process.browser': !!process.env.BROWSER }),
        resolve(),
        commonjs(),
        json(),
        babel({
            exclude: 'node_modules/**', // only transpile our source code
            plugins: ['@babel/plugin-transform-destructuring']
        })
    ]
};