import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
    @UseGuards(AuthGuard("jwt"))
    @Get('me')
    getMe(@Req() req: Request) {
        // we have req.user here
        return "this is me"
    }
}
