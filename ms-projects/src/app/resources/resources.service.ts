import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
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
  ) {}

  // INACABADO!
  // `1- montar o ventor com a lista de id de colaboradores`
  // `2- lista de colaboradores com as informações`
  // `3- percorrer a lista de recursos, verificar com a lista de colabores, validar o id desse registro com o id do vetor`
  // `4- adicionar prop de colaborador com as informações do ms-collaborator`
  async findAll() {
    // const resources = await this.resourcesRepository.find()titea
    const collaboratorIdList = await this.resourcesRepository.find({
      select: ['collaboratorId'],
    });

    const collaborators = this.httpService.post(
      'http://localhost:3501/api/v1/collaborators/list',
      collaboratorIdList,
    );

    // resources.map(resource => {{
    //   resource.collaboratorId = collaborators(collaborator => collaborator.id === resource.collaboratorId);
    //   return resource
    // })

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
