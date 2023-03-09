import { Server } from 'http'
import { WebSocketServer } from 'ws'
import depthLimit from 'graphql-depth-limit'
import { useServer } from 'graphql-ws/lib/use/ws'
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault
} from 'apollo-server-core'

import { schema, tabs } from '../graphql/schema'
import { mongoHelper } from '../helpers/mongoHelpers'

class ApolloHelper {
  private httpServer: Server | undefined = undefined

  private async drainServer() {
    const wsServer = new WebSocketServer({
      server: this.httpServer,
      path: '/graphql'
    })

    // Hand in the schema we just created and have the
    // WebSocketServer start listening.
    const serverCleanup = useServer({ schema }, wsServer)
    await serverCleanup.dispose()
  }

  public init(httpServer: Server) {
    this.httpServer = httpServer

    const apolloServer = new ApolloServer({
      schema,
      playground: { tabs },
      validationRules: [depthLimit(7)],
      context: async ({ req }) => await mongoHelper.validateUser(req),
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault()
          : ApolloServerPluginLandingPageGraphQLPlayground(),

        // Proper shutdown for the HTTP server.
        httpServer && ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        { serverWillStart: async () => this.drainServer }
      ].filter(Boolean)
    } as ApolloServerExpressConfig)

    return apolloServer
  }
}

export const apolloHelper = new ApolloHelper()
