import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: any) {}

  public transform(incomeValues: any, metadata: ArgumentMetadata) {
    const values = this.getValidationValues(incomeValues);
    const { error, value } = this.schema.validate(values);
    this.getError(error);

    return value;
  }

  private getValidationValues(value: { [x: string]: any; _ver: any }) {
    const { _ver, ...validateValue } = value;

    return validateValue;
  }

  private getError(error: any) {
    if (error) {
      throw new BadRequestException({
        DETAILS: `${error.details[0].message}`,
        EN: `Validation error`,
      });
    }
  }
}
