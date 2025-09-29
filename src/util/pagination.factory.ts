import { Injectable } from '@nestjs/common'
import { PaginationDto, PaginationResultDto } from 'src/dto/PaginationDto'

@Injectable()
export class PaginationFactory {
  create<T>(paginationDto: PaginationDto, dataSource: T[], fields?: string[]): PaginationResultDto {
    const { limit = 10, offset = 0 } = paginationDto
    const result: Partial<T>[] = []

    for (let i = offset; i < offset + limit; i++) {
      if (i >= dataSource.length) {
        break
      }

      const currentWithFilteredFields = this.filterRowFields(dataSource[i], fields)
      result.push(currentWithFilteredFields)
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

  private filterRowFields<T>(currentRow: T, fields: string[]) {
    if (!fields || fields.length <= 0) {
      return currentRow
    }

    const currentRowWithFilteredFields: Partial<T> = {}
    Object.keys(currentRow).forEach(key => {
      if (fields.includes(key)) {
        currentRowWithFilteredFields[key as keyof T] = currentRow[key as keyof T]
      }
    })

    return currentRowWithFilteredFields
  }
}
