import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'
import 'graphql-import-node'

const mergedTypeDefs = loadFilesSync(path.join(__dirname, './typeDefs'))
const typeDefs = mergeTypeDefs(mergedTypeDefs)

const mergedResolvers = loadFilesSync(path.join(__dirname, './resolvers'))
const resolvers = mergeResolvers(mergedResolvers)

export const tabs = loadFilesSync(path.join(__dirname, './tabs/**/*'))

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
