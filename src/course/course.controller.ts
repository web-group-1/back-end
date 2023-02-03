import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { timeStamp } from 'console';

@Controller('courses')
export class CourseController {
    constructor(private courceService: CourseService) {}

    @Get()
    getAllCources() {
        return this. courceService.getAllCourses()
    }
}
