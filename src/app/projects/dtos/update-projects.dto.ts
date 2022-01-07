/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
import { ActivitiesEntity } from "src/app/activities/activities.entity";
import { Double } from "typeorm";

export class UpdateProjectDto{
    
    @IsNotEmpty()
    endDate: Date;

    @IsNotEmpty()
    contractedHours: Date;

    @IsNotEmpty()
    value: Double;
    
    @IsNotEmpty()
    spatialScale: string;

    @IsNotEmpty()
    controlHours: boolean;
    
    @IsNotEmpty()
    activities: ActivitiesEntity[];

}