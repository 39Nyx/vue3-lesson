import minimist from 'minimist'
import { resolve } from 'path'
import { createRequire } from 'module'
import esbuild from 'esbuild'

const require = createRequire(import.meta.url)
const args = minimist(process.argv.slice(2))
const target = args._[0]
const format = args.f || 'umd'
const pkg = require(`../packages/${target}/package.json`)

const entry = resolve(process.cwd(), `packages/${target}/src/index.ts`)

esbuild.context({
    entryPoints: [entry],
    outfile: resolve(process.cwd(), `packages/${target}/dist/${target}.${format}.js`),
    bundle: true,
    platform: 'browser',
    sourcemap: true,
    format: format,
    globalName: pkg.buildOptions?.globalName,
}).then((ctx) => {
    console.log('start dev')
    return ctx.watch()
})
