import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRequestDto {
  @ApiProperty({ required: false })
  public readonly lastName: string;

  @ApiProperty({ required: false })
  public readonly firstName: string;

  @ApiProperty({ required: false })
  public readonly middleName: string;

  @ApiProperty({ required: false })
  public readonly birthday: Date;

  @ApiProperty({ required: false })
  public readonly biography: string;
}
