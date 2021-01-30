import {
    Model,
    Table,
    Column,
    AllowNull,
    IsEmail,
    BeforeCreate,
    HasOne,
    BelongsTo,
    ForeignKey
} from "sequelize-typescript";

import { User } from './User';

@Table({ tableName: "posts", paranoid: true })
export class Post extends Model implements Model {

    @Column text!: string;

    @ForeignKey(() => User)
    @Column userId!: number;

    @BelongsTo(() => User)
    user: User;
}