import { ISignInDto } from "./signin.dto";

export interface ISignUpDto extends ISignInDto {
    name: string;
    avatar: string;
}