import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

jest.mock('axios');

const mockConfigService = {
  get: jest.fn().mockReturnValue('demo'),
};

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should fetch weather data', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { weather: 'sunny' } });
    const result = await service.getWeather('delhi');
    expect(result).toEqual({ weather: 'sunny' });
  });
});
