import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserUpdateDto } from 'src/auth/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async updateUSer(dto: UserUpdateDto, userId:number) {
        let updatedUser = await this.prisma.user.update({
            where: {id: userId},
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                emailAddress: dto.email
            }
        })
        delete updatedUser.hash
        return updatedUser
    }

    async deleteUser(userId:number) {
        let deletedUser = await this.prisma.user.delete({
            where: {
                id: userId
            }
        })
        delete deletedUser.hash
        return deletedUser
    }
}
