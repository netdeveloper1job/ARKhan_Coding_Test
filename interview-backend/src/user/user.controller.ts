import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from './user.dto';

@ApiTags('User')
@ApiBearerAuth('JWT')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiResponse({ status: 200, type: UserResponseDto })
  async findById(@Param('id') id: number): Promise<User | null> {
    return this.userService.findById(id);
  }
}
