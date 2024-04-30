import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Level {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'name' })
    username!: string

    @Column({ name: 'created_at' })
    createdAt!: Date

    @Column({ name: 'updated_at' })
    updatedAt!: Date

}
