/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateActivities {

  @IsString()
  @ApiProperty()
  @IsOptional()
  name: string;

  @IsOptional()
  @ApiProperty()
  startDate: string;

  @IsOptional()
  @ApiProperty()
  endDate: string;
}
