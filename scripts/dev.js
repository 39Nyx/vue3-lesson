import minimist from 'minimist'
import { resolve } from 'path'

const args = minimist(process.argv.slice(2))
const target = args._[0]
const format = args.f || 'umd'

const entry = resolve(process.cwd(), `packages/${target}/src/index.ts`)
console.log(entry, target, format)
