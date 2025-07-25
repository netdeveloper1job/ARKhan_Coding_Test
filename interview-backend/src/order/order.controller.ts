import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.schema';
import { Types } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto, OrderResponseDto } from './order.dto';

@ApiTags('Order')
@ApiBearerAuth('JWT')
@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, type: OrderResponseDto })
  async create(@Body() body: CreateOrderDto): Promise<Order> {
    const productObjectIds = body.productIds.map(id => new Types.ObjectId(id));
    return this.orderService.create({
      userId: body.userId,
      productIds: productObjectIds,
      totalAmount: body.totalAmount,
    });
  }

  @Get()
  @ApiResponse({ status: 200, type: [OrderResponseDto] })
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }
}
