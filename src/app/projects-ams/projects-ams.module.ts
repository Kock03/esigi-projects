import { Module } from '@nestjs/common';
import { ProjectsAmsService } from './projects-ams.service';
import { ProjectsAmsController } from './projects-ams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsAmsEntity } from './projects-ams.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsAmsEntity])],
  controllers: [ProjectsAmsController],
  providers: [ProjectsAmsService],
})
export class ProjectsAmsModule {}
