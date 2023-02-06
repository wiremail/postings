import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { JwtService } from "@nestjs/jwt"
import { FilesService } from 'src/files/files.service'
import { CreatePostingDto } from './dto/create-posting.dto'
import { Posting } from './postings.model'
import { User } from 'src/users/users.model'

@Injectable()
export class PostingsService {

  constructor(
    @InjectModel(Posting) private postingRepository: typeof Posting,
    private fileService: FilesService,
    private jwtService: JwtService,
  ) { }

  getUserId(auth: string): number {
    const token: string = auth.split(' ')[1]
    const payload: any = this.jwtService.decode(token)
    return payload.id
  }

  async create(dto: CreatePostingDto, image: any, auth: string) {
    const userId = this.getUserId(auth)
    const fileName = await this.fileService.createFile(image)
    const posting = await this.postingRepository.create({ ...dto, image: fileName, userId })
    return posting
  }

  async getAllPostings() {
    const postings = await this.postingRepository.findAll({ include: { all: true } })
    return postings
  }

  async getBunchPostings(query: any) {
    const offset: number = query.offset ?? 0
    const limit: number = query.limit ?? 10

    delete query.offset
    delete query.limit

    const { count, rows } = await this.postingRepository.findAndCountAll({
      where: query,
      offset,
      limit
    })

    return { count, rows }
  }

  async findOne(id: number) {
    const posting = await this.postingRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    })
    if (!posting) {
      throw new HttpException('Posting NOT Found', HttpStatus.NOT_FOUND)
    }
    return posting
  }

  async getUserPostings(userId: number) {
    const postings = await this.postingRepository.findAll({ where: { userId } })
    if (!postings) {
      throw new HttpException('Postings NOT Found', HttpStatus.NOT_FOUND)
    }
    return postings
  }

  async update(id: number, dto: CreatePostingDto, auth: string) {
    const userId = this.getUserId(auth)
    const [numberOfAffectedRows, [updatedPost]] = await this.postingRepository.update(
      { ...dto },
      { where: { id, userId }, returning: true }
    )

    return { numberOfAffectedRows, updatedPost }
  }

  async delete(id: number, auth: string) {
    const userId = this.getUserId(auth)
    const result = await this.postingRepository.destroy({ where: { id, userId } })

    if (!result) {
      throw new HttpException('Posting NOT Found', HttpStatus.NOT_FOUND)
    }

    return result
  }

}
