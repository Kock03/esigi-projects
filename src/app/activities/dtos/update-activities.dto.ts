/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';
<<<<<<< HEAD

export class UpdateActivities {
  @IsNotEmpty()
  startDate: Date;
=======
import { ResourcesEntity } from 'src/app/resources/resources.entity';

export class UpdateActivities {
  @IsNotEmpty()
  name: string;
>>>>>>> feature/178-cadastro-recursos

  @IsNotEmpty()
  endDate: Date;
}
