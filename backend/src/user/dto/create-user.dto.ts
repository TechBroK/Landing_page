import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'kunle@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Transform((value: TransformFnParams) => value.value.toLowerCase())
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password',
  })
  @IsNotEmpty()
  password: string;
}
