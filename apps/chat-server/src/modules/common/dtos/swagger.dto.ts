import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ApiBaseResponseDto, ApiResponseDto } from './api-response.dto';
import { PaginationMetaDto } from './pagination.dto';

export class SwaggerGenericResponse extends ApiBaseResponseDto {}

// SwaggerResponse generator for single object responses
export function SwaggerResponse<TModel>(model: new () => TModel) {
  class SwaggerResponseType extends ApiResponseDto<TModel> {
    @ApiProperty({
      type: () => model,
      description: 'Response data',
    })
    @Type(() => model)
    data: TModel;
  }

  Object.defineProperty(SwaggerResponseType, 'name', {
    value: `${model.name}Response`,
  });

  return SwaggerResponseType;
}

// Response wrapper for array
export function SwaggerArrayResponse<TModel>(model: new () => TModel) {
  class SwaggerResponseType extends ApiResponseDto<TModel[]> {
    @ApiProperty({ type: () => model, isArray: true })
    @Type(() => model)
    data: TModel[];
  }

  Object.defineProperty(SwaggerResponseType, 'name', {
    value: `${model.name}ArrayResponse`,
  });

  return SwaggerResponseType;
}

// SwaggerPaginatedResponse generator
export function SwaggerPaginatedResponse<TModel>(model: new () => TModel) {
  class PaginatedResultDto {
    @ApiProperty({ isArray: true, type: () => model })
    @Type(() => model)
    items: TModel[];

    @ApiProperty({ type: () => PaginationMetaDto })
    @Type(() => PaginationMetaDto)
    meta: PaginationMetaDto;
  }

  class SwaggerResponseType extends ApiResponseDto<PaginatedResultDto> {
    @ApiProperty({
      type: () => PaginatedResultDto,
      description: 'Paginated response data',
    })
    @Type(() => PaginatedResultDto)
    data: PaginatedResultDto;
  }

  Object.defineProperty(PaginatedResultDto, 'name', {
    value: `${model.name}PaginatedResult`,
  });

  Object.defineProperty(SwaggerResponseType, 'name', {
    value: `${model.name}PaginatedResponse`,
  });

  return SwaggerResponseType;
}
