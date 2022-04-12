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
import { ProjectsEntity } from '../projects/projects.entity';
import { ICollaborator } from './_model/collaborator.model';

@Entity({ name: 'resources' })
export class ResourcesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // TODO - revisar para enum
  @Column()
  paper: number;

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
