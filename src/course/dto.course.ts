import { IsNotEmpty, IsString } from "class-validator"

export class CourseDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string
}