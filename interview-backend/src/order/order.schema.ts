import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  userId: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], required: true })
  productIds: Types.ObjectId[];

  @Prop({ required: true })
  totalAmount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
