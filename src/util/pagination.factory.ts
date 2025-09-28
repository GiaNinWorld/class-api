import { PaginationDto, PaginationResultDto } from 'src/dto/PaginationDto'

export class PaginationFactory {
  create<T>(paginationDto: PaginationDto, dataSource: T[]): PaginationResultDto {
    const { limit = 10, offset = 0 } = paginationDto
    const result: T[] = []

    for (let i = offset; i < offset + limit; i++) {
      if (i >= dataSource.length) {
        break
      }

      result.push(dataSource[i])
    }

    const total = dataSource.length
    const hasNext = total > offset + limit

    return {
      data: result,
      total,
      limit,
      offset,
      hasNext,
      nextPage: hasNext ? offset + limit : null,
    }
  }
}
