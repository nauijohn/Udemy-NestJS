import { instanceToPlain } from "class-transformer";
import { map, Observable } from "rxjs";

import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";

export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data) => instanceToPlain(data)));
  }
}
