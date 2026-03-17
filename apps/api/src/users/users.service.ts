import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findUserByEmail(emaiL: string) {
        return this.prisma.user.findUnique({
            where: {
                email: emaiL,
            }
        });
    }

    async createUser(data: { email: string; fullName: string; password: string }) {
        return this.prisma.user.create({
            data,
        });
    }
}
