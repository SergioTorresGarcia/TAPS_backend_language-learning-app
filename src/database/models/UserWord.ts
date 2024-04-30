import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";
import { Word } from "./Word";

@Entity('user_words')
export class UserWord extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'created_at' })
    createdAt!: Date

    @Column({ name: 'updated_at' })
    updatedAt!: Date

    @Column({ name: 'user_id' })
    userId!: number

    @Column({ name: 'word_id' })
    wordId!: number

    //User < UserWords
    @ManyToOne(() => User, (user) => user.userwords)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    //Word < UserWords
    @ManyToOne(() => Word, (word) => word.userwords)
    @JoinColumn({ name: 'word_id' })
    word!: Word;

}
