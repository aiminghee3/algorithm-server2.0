import { IUser } from "./IUser";

export interface IPost{
    userId : number;
}

export interface IPostInputDTO{
    userId : number;
    title : string;
    problem_number : number;
    problem_link : string;
    rate : number;
    content : string;
    alarm : Date;
    user : IUser;
}

export interface IPostUpdateDTO{
    userId : number;
    postId : number;
    title : string;
    problem_number : number;
    problem_link : string;
    rate : number;
    content : string;
    alarm : Date;
}