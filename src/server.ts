import dotenv from 'dotenv'
import 'module-alias/register'
import { apolloHelper } from './helpers/apolloHelpers'
import { expressHelpers } from './helpers/expressHelpers'
import { mongoHelper } from './helpers/mongoHelpers'

import api from './apis'
import redisClient from './lib/redis/redisClient'
dotenv.config()

const { PORT } = process.env

expressHelpers.init()
mongoHelper.init()

const apolloServer = apolloHelper.init(expressHelpers.server)
apolloServer.applyMiddleware({ app: expressHelpers.app })

// rest endpoint
expressHelpers.app.use('/api', api)
expressHelpers.app.get('/*', (_, res) => res.redirect('/api'))
expressHelpers.app.set('redisClient', redisClient)

expressHelpers.server.on('close', function () {
  console.log('Closing db connection')
  mongoHelper.closeMongoConnection()
})

expressHelpers.server.listen(PORT, () => {
  console.table({
    server: `http://localhost:${PORT}`,
    graphql: `http://localhost:${PORT}${apolloServer.graphqlPath}`
  })
})
