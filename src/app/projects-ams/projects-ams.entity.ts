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
import { ActivitiesEntity } from '../activities/activities.entity';
import { Status } from '../projects/dtos/status.enum';
import { Type } from '../projects/dtos/type.enum';

@Entity({ name: 'projects_ams' })
export class ProjectsAmsEntity {
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

  @Column()
  contractedHours: number;

  @Column()
  projectManager: string;

  @Column({ type: 'int' })
  type: Type;

  @Column({ type: 'int' })
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
