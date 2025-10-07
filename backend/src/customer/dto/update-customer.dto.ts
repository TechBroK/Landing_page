import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty({
    type: String,
    description: 'First name of the customer',
    required: true,
    maxLength: 50,
    default: 'Adekunle',
  })
  @IsNotEmpty()
  @Length(1, 50, { message: 'First name must be between 1 and 50 characters' })
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Middle name of the customer',
    required: false,
    maxLength: 50,
    default: 'Micheal',
  })
  @IsOptional()
  middleName: string;

  @ApiProperty({
    type: String,
    description: 'Last name of the customer',
    required: true,
    maxLength: 50,
    default: 'Adebayo',
  })
  @IsNotEmpty()
  @Length(1, 50, { message: 'Last name must be between 1 and 50 characters' })
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Email of the customer',
    required: true,
    default: '',
  })
  @IsNotEmpty()
  @Length(1, 20, { message: 'Phone must be between 1 and 20 characters' })
  phone: string;

  @ApiProperty({
    type: String,
    description: 'Address of the customer',
    required: true,
    default: 'Oshodi, Lagos',
  })
  @IsNotEmpty()
  @Length(1, 255, { message: 'Address must be between 1 and 255 characters' })
  address: string;

  @ApiProperty({
    type: Date,
    description: 'Date of birth of the customer',
    required: true,
    default: '1990-01-01',
  })
  @IsNotEmpty()
  dateOfBirth: string;
}
