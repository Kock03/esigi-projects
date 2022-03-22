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
import { Status } from './dtos/status.enum';
import { Type } from './dtos/type.enum';

@Entity({ name: 'projects' })
export class ProjectsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: number;

  @Column()
  responsible: string;

  @Column()
  client: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column()
  contractedHours: number;

  @Column({ type: 'double', nullable: true })
  value: Double;

  @Column()
  managerEnvoltiProjectManager: string;

  @Column({ type: 'int' })
  type: Type;

  @Column({ type: 'int' })
  status: Status;

  @OneToMany(() => ActivitiesEntity, (activities) => activities.project, {})
  activities: ActivitiesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
