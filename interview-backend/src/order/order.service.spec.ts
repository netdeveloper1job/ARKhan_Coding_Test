import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getModelToken } from '@nestjs/mongoose';
import { Order } from './order.schema';

const mockOrderArray = [
  { userId: 1, productIds: ['id1', 'id2'], totalAmount: 200 },
];

const mockOrderModel = {
  find: jest.fn().mockReturnThis(),
  populate: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue(mockOrderArray),
  findById: jest.fn().mockReturnThis(),
};

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: getModelToken(Order.name), useValue: mockOrderModel },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should return all orders', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockOrderArray);
  });
});
