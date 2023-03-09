import Redis from 'ioredis'

const redisClient = new Redis(6379, 'localhost')

const EXPIRATION = 60 * 60 * 2 // 2 hours in seconds

export class RedisLock {
  static async setLock(key: string, expiration = EXPIRATION) {
    console.log(`SETTING LOCK ${key}`)
    // set allows you to set an optional expire param
    // @ts-ignore
    return redisClient.set(key, true, 'EX', expiration)
  }

  static async getLock(key: string) {
    console.log(`GETTING LOCK ${key}`)
    return redisClient.get(key)
  }

  static async removeLock(key: string) {
    console.log(`DELETING LOCK ${key}`)
    return redisClient.del(key)
  }
}

export function getNodeSyncRedisKey(wallet: string) {
  return `NODESYNC.${wallet}`
}

export default redisClient
