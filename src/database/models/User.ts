import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
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

}

//     // //Role < Users
//     // @ManyToOne(() => Role, (role) => role.users)
//     // @JoinColumn({ name: 'role_id' })
//     // role!: Role;

//     // //User > Appointments
//     // @OneToMany(() => Appointment, (appointment) => appointment.user)
//     // appointments!: Appointment[];

