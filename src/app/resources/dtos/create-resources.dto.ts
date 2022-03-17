import { isNotEmpty, IsNotEmpty } from 'class-validator';
import { ActivitiesEntity } from 'src/app/activities/activities.entity';

export class CreateResourceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  hours: string;

  @IsNotEmpty()
  isActive: boolean;

  @IsNotEmpty()
  activity: ActivitiesEntity;
}
