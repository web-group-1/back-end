import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './auth.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signUp(dto: SignUpDto): Promise<{token: string}> {
    // generate a dto
    let passwordHash = await argon.hash(dto.password);
    // add the new user
    let newUser: User;
    try {``
      newUser = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          emailAddress: dto.email,
          hash: passwordHash,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
    // we want to delete the the password hash
    delete newUser.hash;
    // and then return the new user
    let token = await this.signToken(newUser.id, newUser.emailAddress)
    return {token,}
  }

  async signIn(dto: SignInDto): Promise<{token: string}> {
    // get a user from the database by email
    let user = await this.prisma.user.findUnique({
      where: {
        emailAddress: dto.email,
      },
    });
    // if the user does not exist, throw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // compare passwords
    let passwordMatch = await argon.verify(user.hash, dto.password);
    // if passwords don't match, throw exception
    if (!passwordMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }
    // return the user
    delete user.hash
    let token =  await this.signToken(user.id, user.emailAddress)
    return {token,}
  }

  async signToken(userId: number, email: string): Promise<string> {
    let payload =  {
      sub: userId,
      email: email
    }

    let token =  await this.jwt.signAsync(payload, {secret: "let's do it", expiresIn: "1h"})
    return token
  }
}
