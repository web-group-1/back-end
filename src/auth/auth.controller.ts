import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(200)
    @Post('signin')
    signIn(@Body() dto:SignInDto) {
        return this.authService.signIn(dto)
    }
}
