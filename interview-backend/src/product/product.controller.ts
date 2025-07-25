import { Controller, Get, Post, Body, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateProductDto, ProductResponseDto } from './product.dto';

@ApiTags('Product')
@ApiBearerAuth('JWT')
@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, type: ProductResponseDto })
  async create(@Body() body: CreateProductDto): Promise<Product> {
    return this.productService.create(body);
  }

  @Get()
  @ApiResponse({ status: 200, type: [ProductResponseDto] })
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, type: ProductResponseDto })
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 200, type: ProductResponseDto })
  async update(
    @Param('id') id: string,
    @Body() body: CreateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }
}
