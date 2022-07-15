/* eslint-disable prettier/prettier */
import { ActivitiesEntity } from 'src/app/activities/activities.entity';
import {
  BeforeInsert,
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
import { ICollaborator } from './_model/collaborator.model';
import { ICustomer } from './_model/customer.model';

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
  customerId: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ type: 'double' })
  contractedHours: Double;

  @Column({ type: 'double', nullable: true })
  value: Double;

  @Column()
  collaboratorRequesterId: string;

  @Column({ type: 'int' })
  type: Type;

  @Column({ type: 'int' })
  status: Status;

  @Column({ nullable: true })
  hourControl: boolean;

  @OneToMany(() => ActivitiesEntity, (activities) => activities.project, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  activities: ActivitiesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  InsertCode() {
    this.code = Math.floor(Math.random() * 65536);
  }

  collaborator: ICollaborator;

  customer: ICustomer;
}
