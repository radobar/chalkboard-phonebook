import { ApiProperty } from '@nestjs/swagger';

export class SigninRequestDto {
  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly password: string;
}
