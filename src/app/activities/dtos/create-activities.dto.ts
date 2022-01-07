/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
import { ProjectsEntity } from "src/app/projects/entity/projects.entity";

export class CreateActivitieDto{

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;

    @IsNotEmpty()
    estimatedHours: Date;

    @IsNotEmpty()
    emplyer: string;

    @IsNotEmpty()
    paper: string;

    @IsNotEmpty()
    status: boolean;

    @IsNotEmpty()
    projects: ProjectsEntity;
}