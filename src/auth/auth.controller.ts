import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    signIn(@Body() dto:SignInDto) {
        return this.authService.signIn(dto)
    }
}
