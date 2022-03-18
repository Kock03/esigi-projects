import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  isNotEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ActivitiesEntity } from 'src/app/activities/activities.entity';

export class CreateResourceDto {
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

  @IsNotEmpty()
  activity: ActivitiesEntity;
}
