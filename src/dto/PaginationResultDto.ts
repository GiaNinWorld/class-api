export class PaginationResultDto {
  data: any[]
  total: number
  limit: number
  offset: number
  hasNext: boolean
  nextPage: number | null
}
