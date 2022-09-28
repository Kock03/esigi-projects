/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Like,
  Repository,
  In,
} from 'typeorm';
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
    projectsRepository: {
      useSoftDelete: true;
    }
  }

  async findAll(token: string) {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    try {
      const projects = await this.projectsRepository.find(options);
      return await this.projectRequest(projects, token);
    } catch (err) {
      console.log(err);
      throw new NotFoundException();
    }
  }

  async findProjectsListById(idList: string[]) {
    return await this.projectsRepository.find({
      select: ['id', 'name', 'code', 'status'],
      where: { id: In(idList) },
    });
  }

  async findByCollaborator(id: string, token: string) {
    try {
      const projects = await this.projectsRepository.query(
        'select projects_entity.name, r.paper, a.start_date, a.end_date, r.estimated_hours, projects_entity.collaborator_requester_id, projects_entity.customer_id from projects_entity left join  activities_entity a on a.project_id = projects_entity.id left join  resources_entity r on r.activity_id = a.id where r.collaborator_id = ' +
          '"' +
          id +
          '"',
      );
      return await this.projectRequest(projects, token);
    } catch (err) {
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

  async findInPreparation(token: string) {
    let project = await this.projectsRepository
      .createQueryBuilder('projects')
      .where('projects.status =1')
      .getMany();
    return await this.projectRequest(project, token);
  }

  async findSent(token: string) {
    let project = await this.projectsRepository
      .createQueryBuilder('projects')
      .where('projects.status =2')
      .getMany();
    return await this.projectRequest(project, token);
  }

  async findStop(token: string) {
    let project = await this.projectsRepository
      .createQueryBuilder('projects')
      .where('projects.status =3')
      .getMany();
    return await this.projectRequest(project, token);
  }

  async findDeclined(token: string) {
    let project = await this.projectsRepository
      .createQueryBuilder('projects')
      .where('projects.status =4')
      .getMany();
    return await this.projectRequest(project, token);
  }

  async findNewProposal(token: string) {
    let project = await this.projectsRepository
      .createQueryBuilder('projects')
      .where('projects.status =5')
      .getMany();
    return await this.projectRequest(project, token);
  }

  async findProject(name: string, status: number, token: string) {
    let project;
    if (name === '') {
      switch (status) {
        case 1:
          project = this.findAll(token);
          return project;
          break;
        case 2:
          project = this.findInPreparation(token);
          return project;
          break;
        case 3:
          project = this.findSent(token);
          return project;
          break;
        case 4:
          project = this.findStop(token);
          return project;
          break;
        case 5:
          project = this.findDeclined(token);
          return project;
          break;
        case 6:
          project = this.findNewProposal(token);
          return project;
          break;
      }
    } else {
      switch (status) {
        case 1:
          project = await this.projectsRepository.find({
            select: [
              'id',
              'name',
              'code',
              'customerId',
              'status',
              'collaboratorRequesterId',
              'startDate',
            ],
            where: [
              {
                name: Like(`%${name}%`),
              },
            ],
          });

          return await this.projectRequest(project, token);

          break;
        case 2:
          project = await this.projectsRepository.find({
            select: [
              'id',
              'name',
              'code',
              'customerId',
              'status',
              'collaboratorRequesterId',
              'startDate',
            ],
            where: [
              {
                name: Like(`%${name}%`),
                status: 1,
              },
            ],
          });
          return await this.projectRequest(project, token);
          break;
        case 3:
          project = await this.projectsRepository.find({
            select: [
              'id',
              'name',
              'code',
              'customerId',
              'status',
              'collaboratorRequesterId',
              'startDate',
            ],
            where: [
              {
                name: Like(`%${name}%`),
                status: 2,
              },
            ],
          });
          return await this.projectRequest(project, token);
          break;
        case 4:
          project = await this.projectsRepository.find({
            select: [
              'id',
              'name',
              'code',
              'customerId',
              'status',
              'collaboratorRequesterId',
              'startDate',
            ],
            where: [
              {
                name: Like(`%${name}%`),
                status: 3,
              },
            ],
          });
          return await this.projectRequest(project, token);
          break;
        case 5:
          project = await this.projectsRepository.find({
            select: [
              'id',
              'name',
              'code',
              'customerId',
              'status',
              'collaboratorRequesterId',
              'startDate',
            ],
            where: [
              {
                name: Like(`%${name}%`),
                status: 4,
              },
            ],
          });
          return await this.projectRequest(project, token);
          break;
        case 6:
          project = await this.projectsRepository.find({
            select: [
              'id',
              'name',
              'code',
              'customerId',
              'status',
              'collaboratorRequesterId',
              'startDate',
            ],
            where: [
              {
                name: Like(`%${name}%`),
                status: 5,
              },
            ],
          });
          return await this.projectRequest(project, token);
          break;
      }
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

  async projectRequest(projects: any, token: string){
    const collaboratorIdList = projects.map((project) => {
      let obj = { id: project.collaboratorRequesterId };
      return project.collaboratorRequesterId;
    });

    const collaborators = await this.httpService
      .post('http://localhost:3501/api/v1/collaborators/list', {
        idList: collaboratorIdList,
      },  {
        headers: {
          authorization: token,
        },
      },)
      .toPromise();

    if (collaborators.data) {
      projects.map((project) => {
        if (project.collaboratorRequesterId != undefined) {
          const collaborator = collaborators.data.find(
            (collaborator) =>
              collaborator.id === project.collaboratorRequesterId,
          );
          if (collaborator) {
            project.collaborator = {
              firstNameCorporateName: collaborator.firstNameCorporateName,
              lastNameFantasyName: collaborator.lastNameFantasyName,
            };
          } else {
            project.collaboratorRequesterId = null;
          }

          return project;
        } else {
          return project;
        }
      });
    } else {
      return projects;
    }

    const customerIdList = projects.map((project) => {
      return project.customerId;
    });

    const customers = await this.httpService
      .post('http://localhost:3506/api/v1/customers/list', {
        idList: customerIdList,
      },  {
        headers: {
          authorization: token,
        },
      },)
      .toPromise();
    if (customers.data) {
      projects.map((project) => {
        if (project.customerId != undefined) {
          const customer = customers.data.find(
            (customer) => customer.id == project.customerId,
          );
          if (customer) {
            project.customer = {
              corporateName: customer.corporateName,
            };
          } else {
            project.customerId = null;
          }

          return project;
        } else {
          return project;
        }
      });
    } else {
      return projects;
    }
  }
}
