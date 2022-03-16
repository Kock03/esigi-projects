/* eslint-disable prettier/prettier */
import { ActivitiesEntity } from 'src/app/activities/activities.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Double,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SpatialScaleType } from './dtos/spatial-scale-type.enum';
import { Status } from './dtos/status.enum';
import { Type } from './dtos/type.enum';

@Entity({ name: 'projects' })
export class ProjectsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'int', unique: true })
  code: number;

  @Column()
  responsible: string;

  @Column()
  client: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column()
  contractedHours: Date;

  @Column({ type: 'double', nullable: true })
  value: Double;

  @Column()
  managerEnvolti: string;

  @Column({ type: 'int' })
  type: Type;

  @Column({ nullable: true })
  spatialScale: boolean;

  @Column({ type: 'int', nullable: true })
  spatialScaleType: SpatialScaleType;

  @Column({ nullable: true })
  controlHours: boolean;

  @Column({ type: 'int', nullable: true })
  status: Status;

  @OneToMany(() => ActivitiesEntity, (activities) => activities.project, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  activities: ActivitiesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
