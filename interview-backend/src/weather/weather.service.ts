import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private configService: ConfigService) {}

  async getWeather(city: string) {
    const apiKey = this.configService.get<string>('OPENWEATHER_API_KEY') || 'demo';
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Failed to fetch weather',
        error.response?.status || 500,
      );
    }
  }
}
