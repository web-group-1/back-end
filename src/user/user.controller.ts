import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SignUpDto, UserUpdateDto } from '../auth/auth.dto'
import { prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AuthGuard("jwt"))
    @Get('me')
    getMe(@Req() req: Request) {
        // we just return the currently logged in user object
        return req.user
    }

    @Post()
    createUser(@Body() dto: SignUpDto) {
        return this.userService.createUser(dto)
    }

    @UseGuards(AuthGuard("jwt"))
    @Put()
    updateUser(@Body() dto: UserUpdateDto, @Req() req: Request) {
        return this.userService.updateUSer(dto, req.user['id'])
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    deleteUser(@Req() req: Request) {
        return this.userService.deleteUser(req.user['id'])
    }
}
