/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { ActivitiesEntity } from './activities.entity';
import { CreateActivitieDto } from './dtos/create-activities.dto';
import { UpdateActivities } from './dtos/update-activities.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(ActivitiesEntity)
    private readonly activitiesRepository: Repository<ActivitiesEntity>,
    private httpService: HttpService,
  ) {}

  async findAll() {
    return await this.activitiesRepository.find();
  }

  async findOneOfFall(
    conditions: FindConditions<ActivitiesEntity>,
    options?: FindOneOptions<ActivitiesEntity>,
  ) {
    options = { relations: ['project'] };
    try {
      const activities = await this.activitiesRepository.findOneOrFail(
        conditions,
        options,
      );

      const collaboratorIdList = activities.resource.map((resource) => {
        return resource.collaboratorId;
      });
      // TODO - Substituir futuramente e remover o toPromise()
      const collaborators = await this.httpService
        .post('http://localhost:3501/api/v1/collaborators/list', {
          idList: collaboratorIdList,
        })
        .toPromise();

      if (collaborators.data) {
        activities.resource.map((resource) => {
          const collaborator = collaborators.data.find(
            (collaborator) => collaborator.id === resource.collaboratorId,
          );
          resource.collaborator = {
            firstNameCorporateName: collaborator.firstNameCorporateName,
            lastNameFantasyName: collaborator.lastNameFantasyName,
          };
          return resource;
        });
      }
      return activities;
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateActivitieDto) {
    const activities = this.activitiesRepository.create(data);
    return await this.activitiesRepository.save(activities);
  }

  async update(id: string, data: UpdateActivities) {
    try {
      await this.activitiesRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.activitiesRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.activitiesRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }

    return await this.activitiesRepository.softDelete({ id });
  }
}
