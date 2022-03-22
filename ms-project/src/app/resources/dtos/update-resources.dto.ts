import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ActivitiesEntity } from 'src/app/activities/activities.entity';

export class UpdateResources {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  role: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  hours: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @IsOptional()
  activity: ActivitiesEntity;
}
