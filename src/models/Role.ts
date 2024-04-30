import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { User } from "./User";

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'name' })
    name!: string

    // //Role > Users
    // @OneToMany(() => User, (user) => user.role)
    // users!: User[];
}