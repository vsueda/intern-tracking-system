import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels
} from 'ng-apexcharts';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatChipsModule,
    NgApexchartsModule
  ],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  // Dummy data
  activityData = {
    series: [{
      name: 'Commit Sayısı',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 150, 160, 180]
    }],
    categories: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
                 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
  };

  currentProjects = [
    {
      name: 'E-Ticaret Backend API',
      progress: 75,
      deadline: '2024-05-15',
      tech: ['Node.js', 'Express', 'MongoDB'],
      mentor: 'Mehmet Yılmaz'
    },
    {
      name: 'Mobile App UI',
      progress: 45,
      deadline: '2024-06-01',
      tech: ['React Native', 'Redux'],
      mentor: 'Ayşe Demir'
    }
  ];

  upcomingEvents = [
    {
      title: 'Backend Development Workshop',
      date: '2024-04-20',
      time: '14:00',
      type: 'Workshop'
    },
    {
      title: 'Code Review Session',
      date: '2024-04-22',
      time: '15:30',
      type: 'Meeting'
    }
  ];

  recentMessages = [
    {
      from: 'Mehmet Yılmaz',
      role: 'Mentor',
      message: 'API dokümantasyonunu inceledim, harika iş çıkarmışsın!',
      time: '2 saat önce'
    },
    {
      from: 'Ayşe Demir',
      role: 'Mentor',
      message: 'Yarınki code review için hazır mısın?',
      time: '5 saat önce'
    }
  ];

  chartOptions: ChartOptions = {
    series: this.activityData.series,
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: this.activityData.categories
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  };
} 