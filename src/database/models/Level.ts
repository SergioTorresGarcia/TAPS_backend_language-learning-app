import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Word } from "./Word"

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

    //Level > Words
    @OneToMany(() => Word, (word) => word.level)
    words!: Word[];

}
