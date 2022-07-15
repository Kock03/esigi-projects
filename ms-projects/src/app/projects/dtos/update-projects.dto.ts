/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Double } from 'typeorm';
import { SpatialScaleType } from './spatial-scale-type.enum';
import { Status } from './status.enum';
import { Type } from './type.enum';

export class UpdateProjectDto {
  @IsOptional()
  @ApiProperty()
  name: string;


  code: number;

  @IsOptional()
  @ApiProperty()
  responsible: string;

  @IsOptional()
  @ApiProperty()
  clientId: string;

  @IsOptional()
  @ApiProperty()
  startDate: Date;

  @IsOptional()
  @ApiProperty()
  endDate: Date;

  @IsOptional()
  @ApiProperty()
  contractedHours: number;

  @IsOptional()
  @ApiProperty()
  value: Double;

  @IsOptional()
  @ApiProperty()
  collaboratorRequesterId: string;

  @IsOptional()
  @IsEnum(Type)
  @ApiProperty()
  type: Type;

  @IsOptional()
  @IsEnum(Status)
  @ApiProperty()
  status: Status;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  hourControl: boolean;
}
