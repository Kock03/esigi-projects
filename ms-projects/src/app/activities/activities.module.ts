/* eslint-disable prettier/prettier */

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesController } from './activities.controller';
import { ActivitiesEntity } from './activities.entity';
import { ActivitiesService } from './activities.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivitiesEntity]), HttpModule],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}
