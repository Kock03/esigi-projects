/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectsController } from "./projects.controller";
import { ProjectsEntity } from "./projects.entity";
import { ProjectsService } from "./projects.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProjectsEntity])],
    controllers: [ProjectsController],
    providers: [ProjectsService],
  })
  export class ProjectsModule {}