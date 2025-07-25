import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from './order.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(data: { userId: number; productIds: Types.ObjectId[]; totalAmount: number }): Promise<Order> {
    const created = new this.orderModel(data);
    return created.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('productIds').exec();
  }

  async findById(id: string): Promise<Order | null> {
    return this.orderModel.findById(id).populate('productIds').exec();
  }
}
