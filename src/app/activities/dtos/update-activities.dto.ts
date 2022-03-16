/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class UpdateActivities {
  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;
}
