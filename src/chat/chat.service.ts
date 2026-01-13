import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async getOrCreateConversation(user1Id: string, user2Id: string) {
    let conversation = await this.conversationRepository
      .createQueryBuilder('conversation')
      .innerJoin('conversation.participants', 'user1')
      .innerJoin('conversation.participants', 'user2')
      .where('user1.id = :user1 AND user2.id = :user2', {
        user1: user1Id,
        user2: user2Id,
      })
      .getOne();

    if (!conversation) {
      conversation = this.conversationRepository.create({
        participants: [{ id: user1Id }, { id: user2Id }],
      });
      await this.conversationRepository.save(conversation);
    }

    return conversation;
  }

  async saveMessage(
    senderId: string,
    content: string,
    target: { communityId?: string; conversationId?: string },
  ) {
    const message = this.messageRepository.create({
      content,
      senderId,
      communityId: target.communityId,
      conversationId: target.conversationId,
    });

    return await this.messageRepository.save(message);
  }
}
