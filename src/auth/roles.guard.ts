import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { Observable } from "rxjs"
import { AddRoleDto } from "src/users/dto/add-role.dto"
import { ROLES_KEY } from "./roles-auth.decorator"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()

    try {
      const requieredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ])
      if (!requieredRoles) {
        return true
      }

      const authHeader = req.headers.authorization
      const [bearer, token] = authHeader.split(' ')

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: "Unauthorized User" })
      }

      const user: any = this.jwtService.decode(token)
      req.user = user
      return user.roles.some((role: AddRoleDto) => requieredRoles.includes(role.value))
    }
    catch (e) {
      throw new HttpException("Access restricted", HttpStatus.FORBIDDEN)
    }
  }

}