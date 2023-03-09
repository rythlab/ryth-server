import mongoose from 'mongoose'
import { Request } from 'express'
import { Config } from '../config'
// import * as jwt from 'jsonwebtoken';
// import User from '../models/users';

mongoose.Promise = require('bluebird')

class MongoHelper {
  public async validateUser(_req: Request) {
    try {
      // const token = req.headers.authorization || ''
      // const payload = <{ data: string; iat: number }>(
      //   jwt.verify(token, <string>process.env.AUTH_ENCRYPTION_SALT)
      // );
      // const email = payload['data'];
      // return await User.find({ email }).then((response: any) => {
      //   if (response.length > 0) {
      //     return { isUserLogged: true, email: email };
      //   }
      //   return { isUserLogged: false };
      // });
    } catch (error) {
      return { isUserLogged: false }
    }
  }

  public closeMongoConnection(): void {
    mongoose.disconnect()
  }

  public async init(): Promise<void> {
    console.log(Config.mongoUrl, 'Config.mongoUrl')
    try {
      mongoose.connect(
        Config.mongoUrl,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false
        },
        () => {
          const { readyState } = mongoose.connection
          const descriptions: Record<number, string> = {
            0: 'Disconnected',
            1: 'Connected',
            2: 'Connecting',
            3: 'Disconnecting'
          }

          const description = descriptions[readyState]
          console.log(`${description} to mongoDB: `, Config.mongoUrl)
        }
      )
    } catch (err) {
      // eslint-disable-next-line no-throw-literal
      throw `There is error in connecting Mongo DB ${err.message}`
    }
  }
}

export const mongoHelper = new MongoHelper()
