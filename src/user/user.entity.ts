import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pronouns } from './enum/pronouns.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  domainName: string;

  @Column({ type: 'varchar', length: 100, select: false })
  @Exclude()
  password: string;

  @Column({ nullable: false, unique: true })
  @Exclude()
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  username: string;

  @Column({ type: 'enum', enum: Pronouns, default: Pronouns.None })
  pronouns: Pronouns;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
