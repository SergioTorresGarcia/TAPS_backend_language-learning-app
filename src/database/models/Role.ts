import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}
