import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreateProjectsAmsDto } from './dtos/create-projects-ams.dto';
import { UpdateProjectsAmsDto } from './dtos/update-projects-ams.dto';
import { ProjectsAmsEntity } from './projects-ams.entity';

@Injectable()
export class ProjectsAmsService {
  constructor(
    @InjectRepository(ProjectsAmsEntity)
    private readonly projectsRepository: Repository<ProjectsAmsEntity>,
  ) {}

  async findAll() {
    return await this.projectsRepository.find();
  }

  async findOneOrFaill(
    conditions: FindConditions<ProjectsAmsEntity>,
    options?: FindOneOptions<ProjectsAmsEntity>,
  ) {
    options = { relations: ['activities'] };
    try {
      return await this.projectsRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateProjectsAmsDto) {
    const project = this.projectsRepository.create(data);
    return await this.projectsRepository.save(project);
  }

  async update(id: string, data: UpdateProjectsAmsDto) {
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
