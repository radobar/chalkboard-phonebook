import { ApiProperty } from '@nestjs/swagger';

export class SignupRequestDto {
  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly password: string;

  @ApiProperty()
  public readonly passwordConfirmation: string;

  @ApiProperty()
  public readonly lastName: string;

  @ApiProperty()
  public readonly firstName: string;

  @ApiProperty()
  public readonly middleName: string;

  @ApiProperty()
  public readonly birthday: Date;

  @ApiProperty()
  public readonly biography: string;
}
