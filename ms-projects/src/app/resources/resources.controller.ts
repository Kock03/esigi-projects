import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { ResourcesService } from "./resources.service";
import { CreateResourceDto } from "./dtos/create-resources.dto";
import { UpdateResources } from "./dtos/update-resources.dto";

@Controller('projects/api/v1/resources')
export class ResourcesController {
    constructor(private readonly resourcesService: ResourcesService) { }

    @Get()
    async index() {
        return await this.resourcesService.findAll();
    }

    @Post()
    async store(@Body() body: CreateResourceDto) {
        return await this.resourcesService.store(body);
    }
    @Post('/list')
    async findCollaboratorsListById(@Body() body: any) {
        return await this.resourcesService.findByCollaborator(body.idList);
    }

    // @Get('collaborator')
    // async findByCollaborator(@Query('collaboratorId') collaboratorId?: any) {
    //     return await this.resourcesService.findByCollaborator(collaboratorId);
    // }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.resourcesService.findOneOfFall({ id });
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateResources
    ) {
        return await this.resourcesService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.resourcesService.destroy(id);
    }
}