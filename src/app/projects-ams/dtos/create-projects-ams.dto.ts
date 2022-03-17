import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ActivitiesEntity } from 'src/app/activities/activities.entity';
import { Status } from 'src/app/projects/dtos/status.enum';
import { Type } from 'src/app/projects/dtos/type.enum';

export class CreateProjectsAmsDto {
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
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

  @ApiProperty()
  @IsNotEmpty()
  contractedHours: number;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  projectManager: string;

  @IsNotEmpty()
  @IsEnum(Type)
  @ApiProperty()
  type: Type;

  @IsNotEmpty()
  @IsEnum(Status)
  @ApiProperty()
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  activities: ActivitiesEntity[];
}
