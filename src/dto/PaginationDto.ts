import { IsOptional, IsPositive, Min } from 'class-validator'

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  limit?: number

  @IsOptional()
  @Min(0)
  offset?: number
}

export class PaginationResultDto {
  data: any[]
  total: number
  limit: number
  offset: number
  hasNext: boolean
  nextPage: number | null
}
