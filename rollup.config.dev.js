import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import progress from 'rollup-plugin-progress'
import eslint from 'rollup-plugin-eslint'
import rolluprc from './.rolluprc.json'

export default [
  {
    entry: rolluprc.entryConfig,
    dest: pkg.main,
    format: 'cjs',
    plugins: [
      progress({ clearLine: false }),
      eslint({ throwOnError: true, throwOnWarning: true }),
      babel(rolluprc.babelConfig)
    ],
    sourceMap: false,
    exports: 'named'
  }
]