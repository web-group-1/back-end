import { Injectable } from '@nestjs/common';
import { SignUpDto } from './auth.dto';
import * as argon from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {} 

    async signUp(dto: SignUpDto) {
        // generate a dto
        let passwordHash = await argon.hash(dto.password)
        // add the new user 
        let newUser = await this.prisma.user.create({data: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            emailAddress: dto.email,
            hash: passwordHash
        }})
        // we want to delete the the password hash
        delete newUser.hash
        // return the new user
        return {newUser,}
    }
}
