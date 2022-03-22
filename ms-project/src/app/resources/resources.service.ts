import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { ResourcesEntity } from './resources.entity';
import { CreateResourceDto } from './dtos/create-resources.dto';
import { UpdateResources } from './dtos/update-resources.dto';
import { NotFoundException } from '../exceptions/not-found-exception';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(ResourcesEntity)
    private readonly resourcesRepository: Repository<ResourcesEntity>,
  ) {}

  async findAll() {
    return await this.resourcesRepository.find();
  }

  async findOneOfFall(
    conditions: FindConditions<ResourcesEntity>,
    options?: FindOneOptions<ResourcesEntity>,
  ) {
    try {
      return await this.resourcesRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateResourceDto) {
    const resources = this.resourcesRepository.create(data);
    return await this.resourcesRepository.save(resources);
  }
  async update(id: string, data: UpdateResources) {
    try {
      await this.resourcesRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.resourcesRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.resourcesRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.resourcesRepository.softDelete({ id });
  }
}
