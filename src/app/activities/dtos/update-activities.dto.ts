/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class UpdateActivities {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;
}
