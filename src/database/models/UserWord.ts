import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";
import { Word } from "./Word";

@Entity()
export class UserWord {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'created_at' })
    createdAt!: Date

    @Column({ name: 'updated_at' })
    updatedAt!: Date

    //User < UserWords
    @ManyToOne(() => User, (user) => user.userwords)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    //Word < UserWords
    @ManyToOne(() => Word, (word) => word.userwords)
    @JoinColumn({ name: 'word_id' })
    word!: Word;

}
