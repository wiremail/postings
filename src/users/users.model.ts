import { ApiProperty } from '@nestjs/swagger'
import { Table, Model, Column, DataType, BelongsToMany, HasMany } from 'sequelize-typescript'
import { Posting } from 'src/postings/postings.model'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'

interface UserCreationAttrs {
  email: string
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({ example: '1', description: 'Uniq Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ApiProperty({ example: 'test@email.com', description: 'Email Address' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email: string

  @ApiProperty({ example: 'Qwerty123', description: 'Password' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string

  @ApiProperty({ example: 'true', description: 'Banned user or not' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  banned: boolean

  @ApiProperty({ example: 'asdfg', description: 'Ban Reason' })
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  banReason: string

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]

  @HasMany(() => Posting)
  postings: Posting[]
}