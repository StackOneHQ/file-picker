import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const isProduction = process.env.NODE_ENV === 'production';

const plugins = isProduction ? [terser()] : [];
const outputOptions = isProduction ? {} : { sourcemap: true };

export default {
    input: 'src/index.ts',
    output: [
        {
            dir: './dist',
            format: 'cjs',
            plugins,
            ...outputOptions,
        },
        {
            file: './dist/index.es.mjs',
            format: 'es',
            plugins,
            ...outputOptions,
        },
    ],
    plugins: [
        commonjs(),
        json(),
        typescript({
            clean: true,
            useTsconfigDeclarationDir: true,
            tsconfigOverride: {
                exclude: ['**/*.spec.ts'],
            },
        }),
    ],
};
