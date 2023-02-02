import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    @Post('signup')
    createUser(@Body() dto:SignUpDto) {
        console.log({
            dto,
        })
        return {"message": "user created"}
    }

}
