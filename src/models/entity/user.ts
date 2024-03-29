import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public lastUpdatedAt: Date;

}