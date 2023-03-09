import cors from 'cors'
import http, { Server } from 'http'
import compression from 'compression'
import express, { Express } from 'express'
import path from 'path'

class ExpressHelpers {
  public app: Express = express()
  public server: Server = http.createServer(this.app)

  constructor() {
    console.clear()
  }

  // public pathToFile = path.resolve(__dirname, '../../file_storage')

  public init() {
    const app = this.app

    app.use('/static', express.static('file_storage/files/tkX'))
    app.use(express.json({ limit: '20mb' }))
    app.use(express.urlencoded({ limit: '20mb', extended: false }))
    app.use(cors({ maxAge: 86400 }))
    app.set('trust proxy', 1)
    app.use(compression())
  }
}

export const expressHelpers = new ExpressHelpers()
