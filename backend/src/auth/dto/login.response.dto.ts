import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  access_token: string;
}
