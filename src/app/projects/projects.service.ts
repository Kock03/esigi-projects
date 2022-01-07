/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, FindOneOptions, Repository } from "typeorm";
import { CreateProjectDto } from "./dtos/create-projects.dto";
import { UpdateProjectDto } from "./dtos/update-projects.dto";
import { ProjectsEntity } from "./projects.entity";

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(ProjectsEntity)
        private readonly projectsRepository: Repository<ProjectsEntity>
    ){ }

    async findAll(){
        const projectsWhiteActivities = await this.projectsRepository
        .createQueryBuilder('projects')
        .leftJoinAndSelect('projects.activities', 'activities')
        .getMany();

        return projectsWhiteActivities;
    }

    async findOneOrFaill(
        conditions: FindConditions<ProjectsEntity>,
        options?: FindOneOptions<ProjectsEntity>
    ){
        try{
              return await this.projectsRepository.findOneOrFail(conditions, options);
        }catch(error){
                throw new NotFoundException(error.message);
            }
        }
    
    async store(data: CreateProjectDto){
        const project = this.projectsRepository.create(data);
        return await this.projectsRepository.save(project);
    }
    
    async update(id: string, data: UpdateProjectDto){
        const project = await this.projectsRepository.findOneOrFail({id});
        this.projectsRepository.merge(project, data);
        return await this.projectsRepository.save(project);
    }

    async destroy(id: string){
        await this.projectsRepository.findOneOrFail({id});
        this.projectsRepository.softDelete({id});
    }
   
}