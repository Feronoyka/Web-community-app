import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pronouns } from './enum/pronouns.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Column()
  id: string;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  domainName: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  username: string;

  @Column({ type: 'enum', enum: Pronouns, default: Pronouns.None })
  pronouns: Pronouns;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
