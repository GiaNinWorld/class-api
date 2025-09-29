export interface CacheService {
  set(key: string, value: any, ttl: number): Promise<void>
  get<T>(key: string): Promise<T | undefined>
  delete(key: string): Promise<void>
}
