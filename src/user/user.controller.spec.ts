import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let userSvc: Partial<UserService>;

  beforeEach(async () => {
    userSvc = {
      findAll: jest.fn().mockResolvedValue([]),
      findOneById: jest.fn(),
      updateById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userSvc }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll returns users', async () => {
    // @ts-expect-ignore
    (userSvc.findAll as jest.Mock).mockResolvedValue([{ id: '1' }]);
    const res = await controller.findAll();
    expect(res).toEqual([{ id: '1' }]);
  });

  it('findOne returns public profile or throws', async () => {
    // found
    // @ts-expect-ignore
    (userSvc.findOneById as jest.Mock).mockResolvedValueOnce({
      username: 'u',
      domainName: 'd',
      pronouns: 'p',
      description: 'desc',
    });
    const res = await controller.findOne('1');
    expect(res).toEqual({
      username: 'u',
      domainName: 'd',
      pronouns: 'p',
      description: 'desc',
    });

    // not found
    // @ts-expect-ignore
    (userSvc.findOneById as jest.Mock).mockResolvedValueOnce(null);
    await expect(controller.findOne('2')).rejects.toThrow(NotFoundException);
  });

  it('update forwards to service and throws when not found', async () => {
    // success
    // @ts-expect-ignore
    (userSvc.updateById as jest.Mock).mockResolvedValueOnce({
      username: 'new',
      domainName: 'd',
      pronouns: 'p',
      description: 'desc',
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await controller.update('1', { username: 'new' } as any);
    expect(res).toEqual({
      username: 'new',
      domainName: 'd',
      pronouns: 'p',
      description: 'desc',
    });

    // not found
    // @ts-expect-ignore
    (userSvc.updateById as jest.Mock).mockResolvedValueOnce(null);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await expect(controller.update('2', {} as any)).rejects.toThrow(
      NotFoundException,
    );
  });
});
