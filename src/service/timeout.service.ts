import { Injectable, RequestTimeoutException } from '@nestjs/common'

@Injectable()
export class TimeoutService {
  /**
   * Executa uma operação com timeout
   * @param operation Função assíncrona a ser executada
   * @param timeoutMs Timeout em milissegundos
   * @param errorMessage Mensagem de erro personalizada
   */
  async executeWithTimeout<T>(
    operation: () => Promise<T>,
    timeoutMs: number,
    errorMessage: string = 'Operação excedeu o tempo limite'
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new RequestTimeoutException(errorMessage))
      }, timeoutMs)

      try {
        const result = await operation()
        clearTimeout(timeoutId)
        resolve(result)
      } catch (error) {
        clearTimeout(timeoutId)
        reject(error)
      }
    })
  }
}
