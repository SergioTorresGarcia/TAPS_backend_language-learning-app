import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"
import { UserWord } from "./UserWord"

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'username' })
    username!: string

    @Column({ name: 'email' })
    email!: string

    @Column({ name: 'password_hash' })
    passwordHash!: string

    @Column({ name: 'created_at' })
    createdAt!: Date

    @Column({ name: 'updated_at' })
    updatedAt!: Date

    @Column({ name: 'role_id' })
    roleId!: number


    //Role < Users
    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role!: Role;

    //User > UserWords
    @OneToMany(() => UserWord, (userword) => userword.user)
    userwords!: UserWord[];

}

