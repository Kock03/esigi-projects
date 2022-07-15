/* eslint-disable prettier/prettier */
import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { FindConditions, FindManyOptions, FindOneOptions, Like, Repository } from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreateProjectDto } from './dtos/create-projects.dto';
import { UpdateProjectDto } from './dtos/update-projects.dto';
import { ProjectsEntity } from './projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectsRepository: Repository<ProjectsEntity>,
    private httpService: HttpService,
  ) {
    projectsRepository: { useSoftDelete: true };
  }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    try {
      const projects = await this.projectsRepository.find(options);

      const collaboratorIdList = projects.map((project) => {
        console.log(project.collaboratorRequesterId)
        return project.collaboratorRequesterId;
      });

      const collaborators = await this.httpService
        .post('http://localhost:3501/api/v1/collaborators/list', {
          idList: collaboratorIdList,
        })
        .toPromise();

      if (collaborators.data) {
        console.log(collaborators.data)
        projects.map((project) => {
          const collaborator = collaborators.data.find(
            (collaborator) => collaborator.id === project.collaboratorRequesterId);

          project.collaborator = {
            firstNameCorporateName: collaborator.firstNameCorporateName,
            lastNameFantasyName: collaborator.lastNameFantasyName,
          };
          return project;
        })
      }

      const customerIdList = projects.map((project) => {
        return project.customerId;
      });

      const customers = await this.httpService
        .post('http://localhost:3506/api/v1/customers/list', {
          idList: customerIdList,
        })
        .toPromise();
      if (customers.data) {
        projects.map((project) => {
          const customer = customers.data.find(
            (customer) => customer.id == project.customerId);
          project.customer = {
            corporateName: customer.corporateName,
          };
          return project;
        })
      }
      return projects;
    } catch (err) {
      console.log(err)
      throw new NotFoundException();
    }

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
