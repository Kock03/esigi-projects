import { IsNotEmpty } from "class-validator";

export class CreateResourceDto{

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    hours: string; 

    @IsNotEmpty()
    isActive: boolean;
}