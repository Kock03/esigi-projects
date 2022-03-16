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

@Entity({ name: 'resources' })
export class ResourcesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column()
  hours: string;

  @Column()
  isActive: Boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => ActivitiesEntity)
  activity: ActivitiesEntity;
}
