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

@Entity()
export class ResourcesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  paper: string;

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
