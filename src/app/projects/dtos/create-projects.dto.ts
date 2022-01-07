/* eslint-disable prettier/prettier */


import { IsNotEmpty } from "class-validator";
import { ActivitiesEntity } from "src/app/activities/activities.entity";
import { Double } from "typeorm";

export class CreateProjectDto{
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    code: number;

    @IsNotEmpty()
    responsible: string;

    @IsNotEmpty()
    client: string;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;

    @IsNotEmpty()
    contractedHours: Date;

    @IsNotEmpty()
    value: Double;

    @IsNotEmpty()
    managerEnvolti: string;

    @IsNotEmpty()
    type: Type;

    @IsNotEmpty()
    spatialScale: string;

    @IsNotEmpty()
    controlHours: boolean;

    @IsNotEmpty()
    activities: ActivitiesEntity[];

}