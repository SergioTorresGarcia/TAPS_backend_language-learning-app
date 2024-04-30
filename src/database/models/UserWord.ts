import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserWord {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'created_at' })
    createdAt!: Date

    @Column({ name: 'updated_at' })
    updatedAt!: Date

}
