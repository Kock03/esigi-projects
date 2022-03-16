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

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @ManyToOne(() => ProjectsEntity, (projects) => projects.Activities)
  Project: ProjectsEntity;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;

  @OneToMany(() => ResourcesEntity, (resource) => resource.activity, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  resource: ResourcesEntity[];
}
