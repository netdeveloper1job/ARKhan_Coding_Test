import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  userId: number;

  @ApiProperty({ type: [String] })
  productIds: string[];

  @ApiProperty()
  totalAmount: number;
}

export class OrderResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  userId: number;

  @ApiProperty({ type: [String] })
  productIds: string[];

  @ApiProperty()
  totalAmount: number;
}
