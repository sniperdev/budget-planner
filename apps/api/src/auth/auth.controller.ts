import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { registerSchema, RegisterInput, loginSchema, LoginInput } from '@repo/api'
import { jwtConstants } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body(new ZodValidationPipe(loginSchema)) signInDto: LoginInput,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.signIn(signInDto.email, signInDto.password);
    this.setRefreshCookie(res, result.refreshToken);
    return {
      accessToken: result.accessToken,
      user: result.user,
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(
    @Body(new ZodValidationPipe(registerSchema)) signUpDto: RegisterInput,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.signUp(signUpDto.email, signUpDto.password, signUpDto.fullName);
    this.setRefreshCookie(res, result.refreshToken);

    return {
      accessToken: result.accessToken,
      user: result.user,
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies?.[jwtConstants.refreshCookieName];
    if(!refreshToken) {
      throw new UnauthorizedException("Missing refresh token");
    }

    const result = await this.authService.refreshTokens(refreshToken);
    this.setRefreshCookie(res, result.refreshToken);

    return {
      accessToken: result.accessToken,
      user: result.user,
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies?.[jwtConstants.refreshCookieName];
    // if (refreshToken) {}
    res.clearCookie(jwtConstants.refreshCookieName, { path: '/auth' });
    return { ok: true };
  }
  
  private setRefreshCookie(res: Response, refreshToken: string) {
    res.cookie(jwtConstants.refreshCookieName, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
  }
}
