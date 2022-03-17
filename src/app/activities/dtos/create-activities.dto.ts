/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';
import { ProjectsEntity } from 'src/app/projects/projects.entity';
<<<<<<< HEAD
=======
import { ResourcesEntity } from 'src/app/resources/resources.entity';
>>>>>>> feature/178-cadastro-recursos

export class CreateActivitieDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
<<<<<<< HEAD
  project: ProjectsEntity;
=======
  projects: ProjectsEntity;
>>>>>>> feature/178-cadastro-recursos
}
