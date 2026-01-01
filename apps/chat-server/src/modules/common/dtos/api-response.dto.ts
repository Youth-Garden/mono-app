import { ApiProperty } from '@nestjs/swagger';

export abstract class ApiBaseResponseDto {
  @ApiProperty({
    description: 'Application specific error code',
    example: 100,
  })
  code: number = 100;

  @ApiProperty({ description: 'HTTP Status code', example: 200 })
  statusCode: number = 200;

  @ApiProperty({ description: 'Response message', example: 'Success' })
  message: string = 'Success';
}

export abstract class ApiResponseDto<T> extends ApiBaseResponseDto {
  abstract data: T;

  @ApiProperty({
    description: 'Error details (only present on errors)',
    required: false,
  })
  errors?: any;

  @ApiProperty({
    description: 'Pagination metadata (only for paginated responses)',
    required: false,
  })
  meta?: any;
}
