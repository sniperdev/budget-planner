import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordValid = await bcrypt.compare(pass, user.password);
        if (!passwordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user.id };
        return {
            token: await this.jwtService.signAsync(payload),
        }
    }

    async signUp(email: string, pass: string, fullName: string): Promise<any> {
        const existingUser = await this.usersService.findUserByEmail(email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(pass, 12);

        const createdUser = await this.usersService.createUser({
            email,
            fullName,
            password: hashedPassword,
        })

        const payload = { email: createdUser.email, sub: createdUser.id };
        return {
            token: await this.jwtService.signAsync(payload),
            user: {
                id: createdUser.id,
                email: createdUser.email,
                fullName: createdUser.fullName,
            }
        }
    }
}
