import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class AddRoleDto {
  @ApiProperty({ example: 'USER', description: 'Role of User' })
  @IsString({ message: 'String Expected' })
  readonly value: string

  @ApiProperty({ example: '1', description: 'User ID' })
  @IsNumber({}, { message: 'Number Expected' })
  readonly userId: number
}