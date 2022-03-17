/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectsEntity } from '../projects/projects.entity';
import { ResourcesEntity } from '../resources/resources.entity';

@Entity({ name: 'activities' })
export class ActivitiesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => ProjectsEntity, (project) => project.activities)
  project: ProjectsEntity;

  @OneToMany(() => ResourcesEntity, (resource) => resource.activity, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  resource: ResourcesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
