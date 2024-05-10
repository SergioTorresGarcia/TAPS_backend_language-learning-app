import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Level } from "./Level"
import { UserWord } from "./UserWord"

@Entity('words')
export class Word extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'EN' })
    EN!: string

    @Column({ name: 'JP' })
    JP!: string

    @Column({ name: 'romanji' })
    romanji!: string

    @Column({ name: 'image' })
    image!: string

    @Column({ name: 'created_at' })
    createdAt!: string

    @Column({ name: 'updated_at' })
    updatedAt!: Date

    @Column({ name: 'level_id' })
    levelId!: number

    @Column({ name: 'challenge_id' })
    challengeId!: number

    //Level < Words
    @ManyToOne(() => Level, (level) => level.words)
    @JoinColumn({ name: 'level_id' })
    level!: Level;

    //Word > UserWords
    @OneToMany(() => UserWord, (userword) => userword.word)
    userwords!: UserWord[];

}
