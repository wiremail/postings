import { ApiProperty } from '@nestjs/swagger'
import { Table, Model, Column, DataType, BelongsToMany } from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { UserRoles } from './user-roles.model'

interface RoleCreationAttrs {
  value: string,
  description: string
}

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleCreationAttrs> {

  @ApiProperty({ example: '1', description: 'Uniq Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ApiProperty({ example: 'ADMIN', description: 'Type Of User' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  value: string

  @ApiProperty({ example: 'Administrator', description: 'Role Description' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}