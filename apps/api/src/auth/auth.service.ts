import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { access } from 'fs';

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
        const tokens = await this.signTokens(user.id, user.email);
        await this.storeRefreshToken(user.id, tokens.refreshToken);
        return {
            accessToken: tokens.accessToken,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
            },
            refreshToken: tokens.refreshToken,
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

        const tokens = await this.signTokens(createdUser.id, createdUser.email);
        await this.storeRefreshToken(createdUser.id, tokens.refreshToken);
        return {
            token: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: createdUser.id,
                email: createdUser.email,
                fullName: createdUser.fullName,
            }
        }
    }

    async refreshTokens(refreshToken: string) {
        let payload: { sub: string; email: string };

        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: jwtConstants.refreshSecret,
            });
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');

        }

        const user = await this.usersService.findUserById(payload.sub);
        if (!user?.refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const valid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!valid) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const tokens = await this.signTokens(user.id, user.email);
        await this.storeRefreshToken(user.id, tokens.refreshToken);
        
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
            }
        }
    }

    async logout(userId: string) {
        await this.usersService.updateRefreshTokenHash(userId, null);
    }

    private async signTokens(userId: string, email: string) {
        const payload = { sub: userId, email };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: jwtConstants.accessSecret,
                expiresIn: jwtConstants.accessExpiresIn,
            }),
            this.jwtService.signAsync(payload, {
                secret: jwtConstants.refreshSecret,
                expiresIn: jwtConstants.refreshExpiresIn,
            })
        ])

        return { accessToken, refreshToken };
    }

    private async storeRefreshToken(userId: string, refreshToken: string) {
        const hash = await bcrypt.hash(refreshToken, 12);
        await this.usersService.updateRefreshTokenHash(userId, hash);
    }
}
