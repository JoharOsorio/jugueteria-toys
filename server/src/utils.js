import { createRequire } from 'node:module'

// generate require function for read json file in ESModule
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)
