

export interface IUser{
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    lastUpdatedAt: Date;
}
export interface IUserInputDTO{
    email: string;
    password: string;
}