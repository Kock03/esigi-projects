import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { ResourcesEntity } from './resources.entity';
import { CreateResourceDto } from './dtos/create-resources.dto';
import { UpdateResources } from './dtos/update-resources.dto';

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
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateResourceDto) {
    const resources = this.resourcesRepository.create(data);
    return await this.resourcesRepository.save(resources);
  }
  async update(id: string, data: UpdateResources) {
    const resource = await this.resourcesRepository.findOneOrFail({ id });
    this.resourcesRepository.merge(resource, data);
    return await this.resourcesRepository.save(resource);
  }

  async destroy(id: string) {
    await this.resourcesRepository.findOneOrFail({ id });
    this.resourcesRepository.softDelete({ id });
  }
}
