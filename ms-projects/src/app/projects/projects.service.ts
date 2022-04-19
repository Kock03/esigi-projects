/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { FindConditions, FindOneOptions, Like, Repository } from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreateProjectDto } from './dtos/create-projects.dto';
import { UpdateProjectDto } from './dtos/update-projects.dto';
import { ProjectsEntity } from './projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectsRepository: Repository<ProjectsEntity>,
  ) {
    projectsRepository: { useSoftDelete: true };
  }

  async findAll() {
    return await this.projectsRepository.find();
  }


  async findOneOrFaill(
    conditions: FindConditions<ProjectsEntity>,
    options?: FindOneOptions<ProjectsEntity>,
  ) {
    options = { relations: ['activities'] };
    try {
      return await this.projectsRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  findProject(query): Promise<ProjectsEntity[]> {
    return this.projectsRepository.find({
      where: [
        { name: Like(`${query.name}%`) },
        { code: Like(`${query.code}%`) }, //id
        { responsible: Like(`${query.responsible}%`) },
        { client: Like(`${query.client}%`) },
        { managerEnvoltiProjectManager: Like(`${query.managerEnvoltiProjectManager}%`) },]
    });
  }

  async findStop() {
    return await this.projectsRepository
      .createQueryBuilder('projects')
      .where('projects.status = 3')
      .getMany();
  }


  async findActive() {
    return await this.projectsRepository
      .createQueryBuilder('projects')
      .where('projects.status = 1')
      .getMany();
  }


  async findSet() {
    return await this.projectsRepository
      .createQueryBuilder('projects')
      .where('projects.status = 2')
      .getMany();
  }


  async store(data: CreateProjectDto) {
    const project = this.projectsRepository.create(data);
    return await this.projectsRepository.save(project);
  }

  async update(id: string, data: UpdateProjectDto) {
    try {
      await this.projectsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.projectsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.projectsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }

    return await this.projectsRepository.softDelete({ id });
  }
}
