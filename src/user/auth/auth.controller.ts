import { UserService } from './../user.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../create-user.dto';
import { LoginDto } from '../login.dto';
import { LoginResponseDto } from '../login-response.dto';
import { type AuthRequest } from './auth.request';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'exposeAll' })
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    return user;
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    return new LoginResponseDto({ accessToken });
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  public async getProfile(@Request() request: AuthRequest) {
    const user = await this.userService.findOneById(request.user.sub);

    if (user) {
      return user;
    }

    throw new NotFoundException('User not found');
  }
}
