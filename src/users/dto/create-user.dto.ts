import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length } from "class-validator"

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'Email Address' })
  @IsString({ message: 'String Expected' })
  @IsEmail({}, { message: 'Invalid Email Address' })
  readonly email: string

  @ApiProperty({ example: 'Qwerty123', description: 'Password' })
  @IsString({ message: 'String Expected' })
  @Length(4, 16, { message: 'Length must be between 4 and 16 characters' })
  readonly password: string
}