import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ where: { username } });
  }

  async create(username: string, password: string): Promise<User> {
    return this.userModel.create({ username, password });
  }

  async findById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }
}
