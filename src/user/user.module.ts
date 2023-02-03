import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [AuthModule, PrismaModule, CourseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
