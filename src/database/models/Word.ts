import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Level } from "./Level"
import { Challenge } from "./Challenge"
import { UserWord } from "./UserWord"

@Entity()
export class Word {
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

    //Level < Words
    @ManyToOne(() => Level, (level) => level.words)
    @JoinColumn({ name: 'level_id' })
    level!: Level;

    //Challenge < Words
    @ManyToOne(() => Challenge, (challenge) => challenge.words)
    @JoinColumn({ name: 'challenge_id' })
    challenge!: Challenge;

    //Word > UserWords
    @OneToMany(() => UserWord, (userword) => userword.word)
    userwords!: UserWord[];

}
