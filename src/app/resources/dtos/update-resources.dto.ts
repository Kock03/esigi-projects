
import { IsNotEmpty } from "class-validator";

export class UpdateResources{
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    isActive: Boolean
}