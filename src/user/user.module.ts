import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PasswordService } from './password/password.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { OwnerGuard } from './owner.guard';

@Module({
  providers: [
    UserService,
    PasswordService,
    AuthService,
    OwnerGuard,
    {
      provide: APP_GUARD,
      useClass: AuthService,
    },
  ],
  controllers: [UserController, AuthController],
})
export class UserModule {}
