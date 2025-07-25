import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from './user.model';

const mockUserArray = [
  { id: 1, username: 'john', password: 'hashed' },
];

const mockUserModel = {
  findOne: jest.fn().mockResolvedValue(mockUserArray[0]),
  create: jest.fn().mockResolvedValue(mockUserArray[0]),
  findByPk: jest.fn().mockResolvedValue(mockUserArray[0]),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User), useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should find user by username', async () => {
    const result = await service.findByUsername('john');
    expect(result).toEqual(mockUserArray[0]);
  });
});
