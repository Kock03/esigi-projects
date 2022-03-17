/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsOptional } from 'class-validator';
import { ProjectsAmsEntity } from 'src/app/projects-ams/projects-ams.entity';
import { ProjectsEntity } from 'src/app/projects/projects.entity';

export class CreateActivitieDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsOptional()
  project: ProjectsEntity;

  @IsOptional()
  projectAms: ProjectsAmsEntity;
}
