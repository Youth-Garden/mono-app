import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from '../modules/common/dtos/api-response.dto';
import { PaginationMetaDto } from '../modules/common/dtos/pagination.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T | { data: T | T[]; meta?: PaginationMetaDto },
  ApiResponseDto<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ApiResponseDto<T>> {
    return next.handle().pipe(
      map((originalData: any) => {
        const statusCode =
          context.switchToHttp().getResponse().statusCode ?? 200;

        // Handle paginated responses
        if (
          originalData?.data &&
          Array.isArray(originalData.data) &&
          originalData.meta
        ) {
          const res = new (class extends ApiResponseDto<T> {
            data = originalData.data;
            meta = originalData.meta;
          })();
          res.statusCode = statusCode;
          return res;
        }

        // Handle standard responses
        const res = new (class extends ApiResponseDto<T> {
          data = originalData?.data ?? originalData;
        })();
        res.statusCode = statusCode;
        return res;
      })
    );
  }
}
