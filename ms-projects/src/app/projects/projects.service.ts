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

  async findProject(name?: string, status?: string) {

    if (!name) {
      return await this.projectsRepository.query(
        'select * from projects where projects.status like' +
        '"%' +
        status +
        '"' +
        'and projects.deleted_at is null ')
    } else if (!status) {
      return await this.projectsRepository.query(
        'select * from projects where projects.name like ' +
        '"%' +
        name +
        '"' +
        'and projects.deleted_at is null ')
    } else {
      return await this.projectsRepository.query(
        'select * from projects where projects.name like ' +
        '"%' +
        name +
        '"' +
        ' and projects.status like'
        + '"%' +
        status +
        '"' +
        'and projects.deleted_at is null')
    }
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
