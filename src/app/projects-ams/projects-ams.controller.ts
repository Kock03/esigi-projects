import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProjectsAmsDto } from './dtos/create-projects-ams.dto';
import { UpdateProjectsAmsDto } from './dtos/update-projects-ams.dto';
import { ProjectsAmsService } from './projects-ams.service';

@Controller('api/v1/projects-ams')
export class ProjectsAmsController {
  constructor(private readonly projectsAmsService: ProjectsAmsService) {}

  @Get()
  async index() {
    return await this.projectsAmsService.findAll();
  }

  @Post()
  async store(@Body() body: CreateProjectsAmsDto) {
    return await this.projectsAmsService.store(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.projectsAmsService.findOneOrFaill({ id });
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateProjectsAmsDto,
  ) {
    return await this.projectsAmsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.projectsAmsService.destroy(id);
  }
}
