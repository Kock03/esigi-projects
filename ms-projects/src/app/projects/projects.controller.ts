/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Headers,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-projects.dto';
import { UpdateProjectDto } from './dtos/update-projects.dto';
import { IProjects } from './interfaces/i-projects.interface';
import { ProjectsService } from './projects.service';

@Controller('api/v1/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  async index(@Headers() headers) {
    return await this.projectsService.findAll(headers.authorization);
  }

  @Post('/list')
  async findProjectsListById(@Body() body: IProjects) {
    return await this.projectsService.findProjectsListById(body.idList);
  }

  @Post('find/name')
  async find(@Body() body: any) {
    return await this.projectsService.findByProject(body.name)
  }

  @Post('find')
  async findByName(@Body() body: any, @Headers() headers) {
    return await this.projectsService.findProject(body.name, body.status, headers.authorization);
  }

  @Get('collaborator')
  async findByCollaborator(@Headers() headers, @Query('id') id?: any) {
    return this.projectsService.findByCollaborator(id, headers.authorization);
  }

  @Post()
  async store(@Body() body: CreateProjectDto) {
    return await this.projectsService.store(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.projectsService.findOneOrFaill({ id });
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateProjectDto,
  ) {
    return await this.projectsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.projectsService.destroy(id);
  }
}
