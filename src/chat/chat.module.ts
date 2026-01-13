import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat-gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Message } from './entities/message.entity';
import { Conversation } from './entities/conversation.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfig } from '../config/auth.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Conversation]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const authConfig = config.get<AuthConfig>('auth');
        return {
          secret: authConfig?.jwt.secret,
          signOptions: {
            expiresIn: parseInt(authConfig?.jwt.expiresIn as string),
          },
        };
      },
    }),
  ],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
