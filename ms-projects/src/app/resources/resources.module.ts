import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesController } from './resources.controller';
import { ResourcesEntity } from './resources.entity';
import { ResourcesService } from './resources.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResourcesEntity]), HttpModule],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
