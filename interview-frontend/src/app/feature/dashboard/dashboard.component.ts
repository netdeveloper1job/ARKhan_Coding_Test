import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/service/http.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentWeather: any = null;
  weather:any = [];

  constructor(private readonly httpService: HttpService) {}

  ngOnInit(): void {
    const url = `${environment.apiUrl}/weather/delhi`;
    this.httpService.get<any>(url).subscribe({
      next: (response) => {
        if (response && response?.data) {

            const uniqueByDate: { [key: string]: any } = {};
  
            response?.data?.list?.forEach((entry:any) => {
              const dateOnly = entry.dt_txt.split(' ')[0]; // 'YYYY-MM-DD'
              if (!uniqueByDate[dateOnly]) {
                uniqueByDate[dateOnly] = entry;
              }
            });
  
   
            this.weather = Object.values(uniqueByDate);;
            this.currentWeather = this.weather[0];
       
        }
      }
    });
  }

  getWeatherIcon(condition: string): string {
    switch (condition?.toLowerCase()) {
      case 'rain': return 'Artboard 12.svg';
      case 'thunderstorm': return 'Artboard 31.svg';
      case 'clear': return 'Artboard 13.svg';
      case 'clouds': return 'Artboard 39.svg';
      default: return 'Artboard 39.svg';
    }
  }

  getDayOfWeek(dateStr:any): string {
    const date = new Date(dateStr);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = days[date.getDay()];
    return dayOfWeek;
  }

  getFormattedDate(): string {
    const date = new Date();
    return `📅 ${date.toLocaleString('en-US', { month: 'short' }).toUpperCase()} ${date.getDate()}th`;
  }
}
