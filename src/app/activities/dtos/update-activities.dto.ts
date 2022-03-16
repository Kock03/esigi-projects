/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';
import { ResourcesEntity } from 'src/app/resources/resources.entity';

export class UpdateActivities {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  endDate: Date;
}
