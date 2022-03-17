import { IsNotEmpty } from 'class-validator';
import { ActivitiesEntity } from 'src/app/activities/activities.entity';

export class UpdateResources {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  isActive: Boolean;

  @IsNotEmpty()
  activity: ActivitiesEntity;
}
