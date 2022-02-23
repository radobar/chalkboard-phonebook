import { ApiProperty } from '@nestjs/swagger';
import { PhoneNumberType } from '../../../../entity/PhoneNumber';

class PhoneNumberDto {
  @ApiProperty({ required: false })
  public readonly type: PhoneNumberType;

  @ApiProperty({ required: true })
  public readonly number: string;
}

export class CreateContactRequestDto {
  @ApiProperty({ required: false })
  public readonly phoneNumbers: PhoneNumberDto[];

  @ApiProperty({ required: false })
  public readonly name: string;

  @ApiProperty({ required: false })
  public readonly email: string;

  @ApiProperty({ required: false })
  public readonly address: string;
}
