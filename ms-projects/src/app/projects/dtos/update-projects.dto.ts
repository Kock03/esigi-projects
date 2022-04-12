/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
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
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  code: number; //id: string

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

  @IsOptional()
  @ApiProperty()
  contractedHours: number;

  @IsOptional()
  @ApiProperty()
  value: Double;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  managerEnvoltiProjectManager: string;

  @IsNotEmpty()
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
