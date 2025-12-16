import { ConfigService } from '@nestjs/config';
import { TypeConfig } from './type.config';

export class TypedConfigService extends ConfigService<TypeConfig> {}
