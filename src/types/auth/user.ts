import { Token } from "./token";

export class User {
    public id : string = "";
    public email : string = "";
    public firstName : string = "";
    public lastName : string = "";
    public createdAt : Date = new Date();
    public updatedAt : Date = new Date();
}

export class UserWithToken extends User{    
    public token : Token | null = null;
}
