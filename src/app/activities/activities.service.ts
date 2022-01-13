/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, FindOneOptions, Repository } from "typeorm";
import { ActivitiesEntity } from "./activities.entity";
import { CreateActivitieDto } from "./dtos/create-activities.dto";
import { UpdateActivities } from "./dtos/update-activities.dto";

@Injectable()
export class ActivitiesService{

    constructor(
        @InjectRepository(ActivitiesEntity)
        private readonly activitiesRepository: Repository<ActivitiesEntity>        
    ){ }

    async findAll(){
        const activitiesWithProjects = await this.activitiesRepository
        .createQueryBuilder('activities')
        .getMany()

        return activitiesWithProjects;
    }

    async findOneOfFall(
        conditions: FindConditions<ActivitiesEntity>,
        options?: FindOneOptions<ActivitiesEntity>
    ){
        options = { relations: ['Project']};
        try{
            return await this.activitiesRepository.findOneOrFail(conditions, options);
        }catch(error){
            throw new NotFoundException(error.message);
        }
    }

    async store(data: CreateActivitieDto){
        const activities = this.activitiesRepository.create(data);
        return await this. activitiesRepository.save(activities);
    }
     async update(id: string, data: UpdateActivities){
         const activitie = await this.activitiesRepository.findOneOrFail({id});
         this.activitiesRepository.merge(activitie, data);
         return await this.activitiesRepository.save(activitie);
    }

    async destroy(id: string){
        await this.activitiesRepository.findOneOrFail({id});
        this.activitiesRepository.softDelete({id});
    }

    

}