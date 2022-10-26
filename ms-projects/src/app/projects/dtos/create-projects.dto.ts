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
  @MinLength(1)
  responsibleyId: string;

  @IsNotEmpty()
  @ApiProperty()
  clientId: string;

  @IsNotEmpty()
  @ApiProperty()
  startDate: string;

  @IsOptional()
  @ApiProperty()
  endDate: string;

  @IsNotEmpty()
  @ApiProperty()
  contractedHours: Double;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  value: Double;

  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  collaboratorRequesterId: string;

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
