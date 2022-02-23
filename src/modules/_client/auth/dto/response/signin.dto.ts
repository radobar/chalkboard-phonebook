import { ApiProperty } from '@nestjs/swagger';

export class SigninResponseDto {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly token: string;
}
