import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { registerSchema, RegisterInput, loginSchema, LoginInput } from '@repo/api'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body(new ZodValidationPipe(loginSchema)) signInDto: LoginInput) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body(new ZodValidationPipe(registerSchema)) signUpDto: RegisterInput) {
    return this.authService.signUp(signUpDto.email, signUpDto.password, signUpDto.fullName);
  }
}
