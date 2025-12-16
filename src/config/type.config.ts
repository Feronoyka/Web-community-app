import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthConfig } from './auth.config';
import { HashConfig } from './hash.config';

export interface TypeConfig {
  database: TypeOrmModuleOptions;
  hash: HashConfig;
  auth: AuthConfig;
}
