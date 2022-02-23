import { ApiProperty } from '@nestjs/swagger';
import { CreateContactRequestDto } from './createContact.dto';

export class UpdateContactRequestDto extends CreateContactRequestDto {
  @ApiProperty({ required: true })
  public readonly id: string;
}
