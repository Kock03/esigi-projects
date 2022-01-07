/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProjectsEntity } from '../projects/projects.entity';

@Entity({name: 'activities'})
export class ActivitiesEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name:'name'})
    name: string;

    @Column({name:'start_date'})
    startDate: Date;

    @Column({name:'end_date'})
    endDate: Date;

    @Column({name:'estimated_hours', type:'datetime'})
    estimatedHours: Date;

    @Column({name:'employer'})
    emplayer: string;

    @Column({name:'paper'})
    paper: string;

    @Column({name:'status'})
    status: boolean;

    @ManyToOne(() => ProjectsEntity, projects => projects.activities)
    projects: ProjectsEntity;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
     updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
    deletedAt: Date;

}