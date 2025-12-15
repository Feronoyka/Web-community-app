import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  username: string;

  @Expose()
  domainName: string;

  @Expose()
  pronouns: string;

  @Expose()
  description: string;
}
