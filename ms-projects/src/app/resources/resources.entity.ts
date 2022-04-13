import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActivitiesEntity } from '../activities/activities.entity';
import { ICollaborator } from './_model/collaborator.model';
import { Paper } from './dtos/paper.enum';

@Entity({ name: 'resources' })
export class ResourcesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  paper: Paper;

  @Column()
  estimatedHours: string;

  @Column()
  isActive: Boolean;

  @Column()
  collaboratorId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => ActivitiesEntity)
  activity: ActivitiesEntity;

  collaborator: ICollaborator;
}
