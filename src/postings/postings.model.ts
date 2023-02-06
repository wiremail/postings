import { ApiProperty } from '@nestjs/swagger'
import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { User } from 'src/users/users.model'

interface PostingCreationAttrs {
  title: string
  content: string
  userId: number
  image: string
}

@Table({ tableName: 'postings' })
export class Posting extends Model<Posting, PostingCreationAttrs> {

  @ApiProperty({ example: '1', description: 'Uniq Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ApiProperty({ example: 'Some Title', description: 'Post Title' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title: string

  @ApiProperty({ example: 'Some Text', description: 'Post text' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  content: string

  @ApiProperty({ example: 'filename.jpg', description: 'Image Name' })
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  image: string

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @BelongsTo(() => User)
  author: User
}