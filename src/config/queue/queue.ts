const Bull = require('bull')

const connectQueue = (name: string, options: any) =>
  new Bull(name, {
    redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST },
    defaultJobOptions: options
  })

export { connectQueue }
