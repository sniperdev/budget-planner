import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import z, { ZodType } from 'zod';

export class ZodValidationPipe<TSchema extends ZodType> implements PipeTransform {
  constructor(private readonly schema: TSchema) {}

  transform(value: unknown, _metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: z.treeifyError(result.error),
      });
    }

    return result.data;
  }
}