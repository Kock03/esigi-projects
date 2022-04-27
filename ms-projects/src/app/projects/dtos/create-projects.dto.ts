/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ActivitiesEntity } from 'src/app/activities/activities.entity';
import { Double } from 'typeorm';
import { SpatialScaleType } from './spatial-scale-type.enum';
import { Status } from './status.enum';
import { Type } from './type.enum';

export class CreateProjectDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  code: number;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  responsible: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  client: string;

  @IsNotEmpty()
  @ApiProperty()
  startDate: Date;

  @IsOptional()
  @ApiProperty()
  endDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  contractedHours: Double;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  value: Double;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  projectManagerEnvolti: string;

  @IsNotEmpty()
  @IsEnum(Type)
  @ApiProperty()
  type: Type;

  @IsNotEmpty()
  @IsEnum(Status)
  @ApiProperty()
  status: Status;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  activities: ActivitiesEntity[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  hourControl: boolean;
}
