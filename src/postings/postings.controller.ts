import { Body, Controller, Post, Get, UploadedFile, UseInterceptors, Headers, UseGuards, Param, Put, Delete, Query } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/auth/roles-auth.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { CreatePostingDto } from './dto/create-posting.dto'
import { Posting } from './postings.model'
import { PostingsService } from './postings.service'

@ApiTags('Postings')
@Controller('postings')
export class PostingsController {
  constructor(private postingService: PostingsService) { }

  @ApiOperation({ summary: 'Create Posting' })
  @ApiResponse({ status: 200 })
  @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       //comment: { type: 'string' },
  //       //outletId: { type: 'integer' },
  //       file: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  //@UseInterceptors(FileExtender)
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPosting(
    @Body() dto: CreatePostingDto,
    @UploadedFile() image: any,
    @Headers('authorization') auth: string
  ) {
    return this.postingService.create(dto, image, auth)
  }

  @ApiOperation({ summary: 'Get All Postings' })
  @ApiResponse({ status: 200, type: Posting })
  @Get()
  getAllPostings() {
    return this.postingService.getAllPostings()
  }

  @ApiOperation({ summary: 'Get Bunch Postings' })
  @ApiResponse({ status: 200, type: Posting })
  @Get('/bunch')
  getBunchPostings(@Query() query: any) {
    return this.postingService.getBunchPostings(query)
  }

  @ApiOperation({ summary: 'Get Posting' })
  @ApiResponse({ status: 200, type: Posting })
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.postingService.findOne(id)
  }

  @ApiOperation({ summary: 'Get User Postings' })
  @ApiResponse({ status: 200, type: [Posting] })
  @Get('/user/:userId')
  getUserPostings(@Param('userId') id: number) {
    return this.postingService.getUserPostings(id)
  }

  @ApiOperation({ summary: 'Update Posting' })
  @ApiResponse({ status: 200, type: Posting })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Put('/:id')
  updatePosting(
    @Param('id') id: number,
    @Body() dto: CreatePostingDto,
    @Headers('authorization') auth: string
  ) {
    return this.postingService.update(id, dto, auth)
  }

  @ApiOperation({ summary: 'Delete Posting' })
  @ApiResponse({ status: 200, type: Number })
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Delete('/:id')
  deletePosting(
    @Param('id') id: number,
    @Headers('authorization') auth: string
  ) {
    return this.postingService.delete(id, auth)
  }
}
