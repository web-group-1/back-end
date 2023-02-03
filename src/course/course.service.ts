import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService) {}

    async getAllCourses() {
        return await this.prisma.course.findMany({
            where: {}
        })
    }

    async getUserCourses(userId: number) {
        let user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }, 
            include: {
                courses: true,
                createdCourses: true,
            }
        })
        return {'created': user.createdCourses, registeredFor: user.courses}
    }
}
