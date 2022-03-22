/* eslint-disable prettier/prettier */
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
      return await this.activitiesRepository.findOneOrFail(conditions, options);
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
