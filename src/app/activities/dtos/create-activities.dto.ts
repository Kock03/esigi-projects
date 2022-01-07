/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
import { ProjectsEntity } from "src/app/projects/projects.entity";

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
    emplayer: string;

    @IsNotEmpty()
    paper: string;

    @IsNotEmpty()
    status: boolean;

    @IsNotEmpty()
    projects: ProjectsEntity;
}