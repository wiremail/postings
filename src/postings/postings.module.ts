import { Module } from '@nestjs/common'
import { PostingsService } from './postings.service'
import { PostingsController } from './postings.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Posting } from './postings.model'
import { User } from 'src/users/users.model'
import { FilesModule } from 'src/files/files.module'

import { Role } from 'src/roles/roles.model'
import { RolesModule } from 'src/roles/roles.module'
import { UserRoles } from 'src/roles/user-roles.model'
import { JwtModule } from '@nestjs/jwt/dist/jwt.module'

@Module({
  providers: [PostingsService],
  controllers: [PostingsController],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Posting]),
    FilesModule,
    RolesModule,
    JwtModule
  ]
})
export class PostingsModule { }
