/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Headers, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ActivitiesService } from "./activities.service";
import { CreateActivitieDto } from "./dtos/create-activities.dto";
import { UpdateActivities } from "./dtos/update-activities.dto";

@Controller('api/v1/activities')
export class ActivitiesController{
    constructor(private readonly activitiesService: ActivitiesService) { }

    @Get()
    async index(){
        return await this.activitiesService.findAll();
    }

    @Post()
    async store(@Body() body: CreateActivitieDto){
        return await this.activitiesService.store(body);
        
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string, @Headers() headers){
        return await this.activitiesService.findOneOfFall({id}, headers.authorization);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateActivities
    ){
        return await this.activitiesService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string){
        await this.activitiesService.destroy(id);
    }
}