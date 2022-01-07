/* eslint-disable prettier/prettier */
import { ActivitiesEntity } from 'src/app/activities/activities.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Double, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'projects'})
export class ProjectsEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name:'name'})
    name: string;

    @Column({name:'code', type:'int'})
    code: number;

    @Column({name:'responsible'})
    responsible: string;

    @Column({name:'client'})
    client: string;

    @Column({name:'start_date'})
    startDate: Date;

    @Column({name:'end_date'})
    endDate: Date;

    @Column({name:'contracted_hours', type:'datetime'})
    contractedHours: Date;

    @Column({name:'value', type:'double'})
    value: Double;

    @Column({name:"manager_envolti"})
    managerEnvolti: string;

    @Column({name:'Type', type:'int'})
    type: Type;

    @Column({name:'spatial_scale'})
    spatialScale: string;

    @Column({name:'control_hours'})
    controlHours: boolean;

    @OneToMany(() => ActivitiesEntity, activities => activities.projects)
    activities: ActivitiesEntity[];

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
     updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
    deletedAt: Date;
    
}
