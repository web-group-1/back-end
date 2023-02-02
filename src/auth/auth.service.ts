import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './auth.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { domainToASCII } from 'url';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: SignUpDto) {
    // generate a dto
    let passwordHash = await argon.hash(dto.password);
    // add the new user
    try {
      let newUser = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          emailAddress: dto.email,
          hash: passwordHash,
        },
      });
      // we want to delete the the password hash
      delete newUser.hash;
      // and then return the new user
      return { newUser };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signIn(dto: SignInDto) {
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
    return {user,}
  }
}
