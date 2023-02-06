import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: 200 })
  @Post('/signup')
  registsignupration(@Body() userDto: CreateUserDto) {
    return this.authService.signup(userDto)
  }

  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200, type: String })
  @Post('/signin')
  signin(@Body() userDto: CreateUserDto) {
    return this.authService.signin(userDto)
  }

  @ApiOperation({ summary: 'Logout User' })
  @ApiResponse({ status: 200 })
  @Post('/signout')
  signout() {
    return this.authService.signout()
  }
}
