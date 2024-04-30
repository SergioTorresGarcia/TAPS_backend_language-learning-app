import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Word } from "./Word";
import { UserWord } from "./UserWord";

@Entity('challenges')
export class Challenge extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'name' })
    name!: string

    @Column({ name: 'created_at' })
    createdAt!: Date

    @Column({ name: 'updated_at' })
    updatedAt!: Date

    //Challenge > Words
    @OneToMany(() => Word, (word) => word.challenge)
    words!: Word[];

}
