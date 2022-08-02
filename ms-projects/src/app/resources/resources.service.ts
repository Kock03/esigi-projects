import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository, In, } from 'typeorm';
import { ResourcesEntity } from './resources.entity';
import { CreateResourceDto } from './dtos/create-resources.dto';
import { UpdateResources } from './dtos/update-resources.dto';
import { NotFoundException } from '../exceptions/not-found-exception';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(ResourcesEntity)
    private readonly resourcesRepository: Repository<ResourcesEntity>,
    private httpService: HttpService,
  ) { }

  async findAll() {
    return this.resourcesRepository.find();
  }

  async findByCollaborator(idList: string[]) {
    let data;
    let object;
    let array = [];
    console.log(idList.length)
    for (let i = 0; i < idList.length; i++) {

      try {
        data = await this.resourcesRepository.query('select resources_entity.collaborator_id, a.id, p.customer_id, p.name from resources_entity left join activities_entity a on a.id=resources_entity.activity_id  left join projects_entity p on p.id=a.project_id where resources_entity.collaborator_id=' + '"' + idList[i] + '"' + ' and resources_entity.deleted_at is null ');
        if (data[0] !== undefined) {
          object = data[0];
          array.push(object);
        }



      } catch (e) {
        console.log(e)
      }

    }
    console.log(array);
    return array;
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
