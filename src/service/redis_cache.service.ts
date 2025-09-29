import { Injectable } from '@nestjs/common'
import { createClient } from 'redis'
import { CacheService } from '../interfaces/cache.service.interface'

@Injectable()
export class RedisCacheService implements CacheService {
  private client = createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` })

  async onModuleInit() {
    await this.client.connect()
  }

  async set(key: string, value: any, ttlSeconds?: number) {
    await this.client.set(key, JSON.stringify(value), { EX: ttlSeconds })
  }

  async get<T>(key: string): Promise<T | undefined> {
    return JSON.parse(await this.client.get(key)) as T
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key)
  }
}
