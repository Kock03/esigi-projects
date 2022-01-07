/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CreateProjectDto } from "./dtos/create-projects.dto";
import { UpdateProjectDto } from "./dtos/update-projects.dto";
import { ProjectsService } from "./projects.service";

@Controller('api/v1/projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService
    ){ }

    @Get()
    async index(){
        return await this.projectsService.findAll();
    }

    @Post()
    async store(@Body() body: CreateProjectDto){
        return await this.projectsService.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string){
        return await this.projectsService.findOneOrFaill({id});
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateProjectDto){
            return await this.projectsService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string){
        await this.projectsService.destroy(id);
    }
    
}