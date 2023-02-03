import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { timeStamp } from 'console';
import { AuthGuard } from '@nestjs/passport';
import { CourseDto } from './dto.course';
import { Request } from 'express';

@Controller('courses')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Get()
    getAllCources() {
        return this. courseService.getAllCourses()
    }

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async createCourse(@Body() dto: CourseDto, @Req() req: Request) {
        return await this.courseService.createCourse(dto, req.user['id'])
    }
}
