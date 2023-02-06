import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { RolesService } from './roles.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Role } from './roles.model'

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

  constructor(private roleService: RolesService) { }

  @ApiOperation({ summary: 'Create Role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto)
  }

  @ApiOperation({ summary: 'Get Role' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value)
  }
}
