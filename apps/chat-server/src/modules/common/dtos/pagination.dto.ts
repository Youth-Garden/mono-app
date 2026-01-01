import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationMetaDto {
  @ApiProperty({ example: 1, description: 'The current page number' })
  page!: number;

  @ApiProperty({ example: 10, description: 'The number of items per page' })
  limit!: number;

  @ApiProperty({ example: 100, description: 'The total number of items' })
  total!: number;

  @ApiProperty({ example: 10, description: 'The total number of pages' })
  totalPages!: number;

  @ApiProperty({ example: true, description: 'Whether there is a next page' })
  hasNextPage!: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether there is a previous page',
  })
  hasPreviousPage!: boolean;
}

export class PaginatedQueryDto {
  @ApiProperty({
    description: 'Page number (starts from 1)',
    example: 1,
    minimum: 1,
    default: 1,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  limit: number = 20;

  @ApiProperty({
    description: 'Search term',
    example: 'search term',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Field to sort by',
    example: 'createdAt',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({
    description: 'Sort order',
    example: 'desc',
    enum: ['asc', 'desc'],
    required: false,
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}

export class PaginatedResult<T> {
  @ApiProperty({ isArray: true })
  items: T[];

  @ApiProperty({ type: () => PaginationMetaDto })
  meta: PaginationMetaDto;
}
