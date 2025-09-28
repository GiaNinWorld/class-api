import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject } from '@nestjs/common'
import { Cache } from 'cache-manager'

export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    await this.cacheManager.set(key, value, ttl * 1000)
  }

  async get<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get(key)
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key)
  }
}
