/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resourceUsage } from 'process';
import { first, retry } from 'rxjs';
import { Any, FindConditions, FindOneOptions, Repository } from 'typeorm';
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

      const collaborators = this.httpService.post(
        'http://localhost:3501/api/v1/collaborators/list',
        { idList: collaboratorIdList },
      );
      collaborators.pipe(first()).subscribe((res) => {
        if (res.data) {
          return activities.resource.map((resource) => {
            resource.collaboratorId = res.data.find(
              (collaborator) => collaborator.id === resource.collaboratorId,
            );
            console.log(activities.resource);
          });
        }
      });

      // const collaboratorToArray = [];
      // collaborators.forEach(function (item: any) {
      //   collaboratorToArray.push(collaborators);
      // });

      // collaborators.pipe(first()).subscribe((res) => {
      //   if (res.data) {
      //     activities.resource.map((resource) => {
      //       resource.collaboratorId = collaboratorToArray.find(
      //         (collaborator) => collaborator.id === resource.collaboratorId,
      //       );
      //       return resource;
      //     });
      //   }
      // });
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
