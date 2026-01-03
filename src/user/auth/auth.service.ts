import { CreateUserDto } from './../create-user.dto';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { PasswordService } from '../password/password.service';
import { User } from '../user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) {}

  public async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOneByEmailWithPassword(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const user = await this.userService.create(createUserDto);
    return user;
  }

  public async login(email: string, plainPassword: string) {
    const user = await this.userService.findOneByEmailWithPassword(email);

    if (
      !user ||
      !(await this.passwordService.verify(plainPassword, user.password))
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateJwtToken(user);
  }

  public async deleteUser(userId: string) {
    return await this.userService.deleteUser(userId);
  }

  private generateJwtToken(user: User) {
    const payload = {
      sub: user.id,
      domainName: user.domainName,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }
}
