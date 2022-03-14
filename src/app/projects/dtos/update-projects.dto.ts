/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Double } from "typeorm";
import { SpatialScaleType } from "./spatial-scale-type.enum";
import { Status } from "./status.enum";

export class UpdateProjectDto {

    @IsOptional()
    @ApiProperty()
    endDate: Date;

    @IsOptional()
    @ApiProperty()
    contractedHours: Date;

    @IsOptional()
    @ApiProperty()
    value: Double;

    @IsOptional()
    @ApiProperty()
    spatialScale: boolean;

    @IsOptional()
    @IsEnum(SpatialScaleType)
    @ApiProperty()
    spatialScaleType: SpatialScaleType;

    @IsOptional()
    @ApiProperty()
    controlHours: boolean;

    @IsOptional()
    @IsEnum(Status)
    @ApiProperty()
    status: Status;

}