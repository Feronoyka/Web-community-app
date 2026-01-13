import { User } from '../../user/user.entity';
import {
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './message.entity';

export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User, (user) => user.conversation)
  @JoinTable()
  participants: User[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @UpdateDateColumn()
  updatedAt: Date;
}
