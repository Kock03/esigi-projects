import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
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
  collaboratorId: string;
  
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  paper: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  estimatedHours: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @IsNotEmpty()
  activity: ActivitiesEntity;
}
