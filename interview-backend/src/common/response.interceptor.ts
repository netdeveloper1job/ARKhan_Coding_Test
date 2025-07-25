import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: data?.message || 'Request successful',
        data: data?.data !== undefined ? data.data : data,
        timestamp: new Date().toISOString(),
        path: request.url,
      })),
    );
  }
}
