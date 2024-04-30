import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

}
