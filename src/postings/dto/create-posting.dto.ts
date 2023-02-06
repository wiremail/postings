import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"
import Express from 'express'

export class CreatePostingDto {
  @ApiProperty({ example: 'Hello World', description: 'Posting Title' })
  @IsNotEmpty()
  @IsString({ message: 'String Expected' })
  readonly title: string

  @ApiProperty({ example: 'Some text', description: 'Posting Body' })
  @IsString({ message: 'String Expected' })
  @Length(10, 200, { message: 'Length must be between 10 and 200 characters' })
  readonly content: string

  // @ApiPropertyOptional({
  //   type: String,
  //   description: 'This is an optional property',
  // })
  // readonly image: string

  // @ApiProperty({ type: 'string', format: 'binary', required: false })
  // readonly image: Express.Multer.File
}