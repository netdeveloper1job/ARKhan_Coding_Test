import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from './product.schema';

const mockProductArray = [
  { name: 'Test', price: 100, description: 'desc' },
];

const mockProductModel = {
  find: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(mockProductArray),
  findById: jest.fn().mockReturnThis(),
  save: jest.fn(),
};

jest.mock('./product.schema');

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: getModelToken(Product.name), useValue: mockProductModel },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should return all products', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockProductArray);
  });
});
