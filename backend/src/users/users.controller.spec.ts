import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

// mock auth guard
const mockAuthGuard = jest.fn();
jest.mock('@nestjs/passport', () => ({
  AuthGuard: jest.fn(() => ({
    canActivate: jest.fn(),
  })),
}));

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn().mockResolvedValue([
              {
                id: '1',
                name: 'John',
                email: 'j@a.com',
                apiKey: '123456',
              },
            ]),
            findUserById: jest.fn().mockImplementation((id: string) => {
              return Promise.resolve({
                id,
                name: 'John',
                email: 'j@a.com',
                apiKey: '123456',
              });
            }),
          },
        },
      ],
    })
      // .overrideGuard(AuthGuard('jwt'))
      // .useValue(mockAuthGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should get users', async () => {
      const users = await controller.getUsers();
      expect(users).toEqual([
        {
          id: '1',
          name: 'John',
          email: 'j@a.com',
          apiKey: '123456',
        },
      ]);
      expect(usersService.getUsers).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should find user by id', async () => {
      const user = await controller.getUserById('1');
      expect(user).toEqual({
        id: '1',
        name: 'John',
        email: 'j@a.com',
        apiKey: '123456',
      });
      expect(usersService.findUserById).toHaveBeenCalledWith('1');
    });
  });

  describe('getProfile', () => {
    it('should return user profile when authenticated', async () => {
      const mockUser = {
        id: '1',
        username: 'testuser',
        password: 'password123',
      };
      const mockRequest = {
        user: { ...mockUser },
      };

      // Simula um usuário autenticado
      mockAuthGuard.mockImplementation((context) => {
        context.switchToHttp().getRequest().user = mockUser;
        return true;
      });

      const result = await controller.getProfile(mockRequest);

      expect(result).toEqual({
        message: 'Authenticated with api key',
        user: { id: '1', username: 'testuser' }, // Senha deve ser removida
      });
    });

    // it('should throw an error when not authenticated', async () => {
    //   mockAuthGuard.mockImplementation(() => {
    //     throw new Error('Unauthorized');
    //   });

    //   await expect(controller.getProfile({} as any)).rejects.toThrow(
    //     'Unauthorized',
    //   );
    // });
  });
});
