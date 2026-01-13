import { Community } from '../../community/community.entity';
import { User } from '../../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity()
export class Message {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.sentMessages)
  sender: User;

  @Column()
  senderId: string;

  @ManyToOne(() => Community, (community) => community.message, {
    nullable: true,
  })
  community: Community;

  @Column({ nullable: true })
  communityId: string;

  @ManyToOne(() => User, (user) => user.sentMessages, { nullable: true })
  receiver: User;

  @Column()
  receiverId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @Column({ nullable: true })
  conversationId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
