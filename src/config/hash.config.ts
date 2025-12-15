import { registerAs } from '@nestjs/config';

export interface HashConfig {
  SALT_ROUNDS: number;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const hashConfig = registerAs(
  'hash',
  (): HashConfig => ({
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || '12'),
  }),
);
