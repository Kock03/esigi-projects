import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ActivitiesEntity } from 'src/app/activities/activities.entity';
import { Paper } from './paper.enum';

export class UpdateResources {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  collaboratorId: string;

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
  @MinLength(3)
  @MaxLength(100)
  @IsEnum(Paper)
  @ApiProperty()
  paper: Paper;

  @IsOptional()
  activity: ActivitiesEntity;
}
