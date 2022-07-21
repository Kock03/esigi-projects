/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ProjectsEntity } from 'src/app/projects/projects.entity';

export class CreateActivitieDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  startDate: string;

  @IsNotEmpty()
  @ApiProperty()
  endDate: string;

  @IsOptional()
  @ApiProperty()
  @IsObject()
  project: ProjectsEntity;
}
