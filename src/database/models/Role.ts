import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'name' })
    name!: string

    @Column({ name: 'created_at' })
    createdAt!: Date

    @Column({ name: 'updated_at' })
    updatedAt!: Date

    //Role > Users
    @OneToMany(() => User, (user) => user.role)
    users!: User[];
}
