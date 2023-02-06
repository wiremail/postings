import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { SequelizeModule } from "@nestjs/sequelize"
import { User } from "./users/users.model"
import { Role } from "./roles/roles.model"
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { UserRoles } from "./roles/user-roles.model"
import { AuthModule } from './auth/auth.module'
import { PostingsModule } from './postings/postings.module'
import { Posting } from './postings/postings.model'
import { FilesModule } from './files/files.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static')
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Posting],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostingsModule,
    FilesModule,
  ],
})
export class AppModule { }