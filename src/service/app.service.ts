import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHealth(): string {
    return 'API is online!'
  }

  //getResources()
}
