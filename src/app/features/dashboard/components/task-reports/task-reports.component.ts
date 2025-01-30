import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule, ApexNonAxisChartSeries } from 'ng-apexcharts';

@Component({
  selector: 'app-task-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    NgApexchartsModule
  ],
  templateUrl: './task-reports.component.html',
  styleUrls: ['./task-reports.component.scss']
})
export class TaskReportsComponent {
  // Görev Dağılımı (Departmanlara Göre)
  departmentChartOptions = {
    series: [{
      name: 'Görev Sayısı',
      data: [18, 22, 12, 15, 8]
    }],
    chart: {
      type: 'bar' as const,
      height: 300
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: '60%'
      }
    },
    colors: ['#3F51B5'],
    xaxis: {
      categories: ['Frontend', 'Backend', 'DevOps', 'UI/UX', 'Test']
    },
    title: {
      text: 'Departman Bazlı Görev Dağılımı',
      align: 'left' as const
    },
    dataLabels: {
      enabled: true
    }
  };

  // Zaman Analizi (Ortalama Tamamlanma Süreleri)
  timeAnalysisChartOptions = {
    series: [{
      name: 'Ortalama Süre (Gün)',
      data: [4.2, 3.8, 5.1, 2.9, 3.5, 4.0]
    }],
    chart: {
      type: 'line' as const,
      height: 300
    },
    stroke: {
      curve: 'smooth' as const
    },
    xaxis: {
      categories: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran']
    },
    title: {
      text: 'Görev Tamamlama Süreleri Analizi',
      align: 'left' as const
    },
    subtitle: {
      text: 'Son 6 ay ortalama tamamlanma süreleri',
      align: 'left' as const
    },
    yaxis: {
      title: {
        text: 'Gün'
      }
    }
  };

  // Performans Metrikleri
  performanceMetrics = [
    {
      title: 'Ortalama Tamamlanma Süresi',
      value: '3.5 gün',
      trend: '+12%',
      icon: 'schedule',
      color: '#2196F3'
    },
    {
      title: 'Zamanında Tamamlanan',
      value: '85%',
      trend: '+5%',
      icon: 'check_circle',
      color: '#4CAF50'
    },
    {
      title: 'Geciken Görevler',
      value: '8',
      trend: '-15%',
      icon: 'warning',
      color: '#FFC107'
    },
    {
      title: 'Aktif Görevler',
      value: '24',
      trend: '+3%',
      icon: 'assignment',
      color: '#9C27B0'
    }
  ];

  // Detaylı Performans Metrikleri
  detailedMetrics = [
    {
      title: 'Görev Tamamlama Oranı',
      value: '92%',
      trend: '+5%',
      icon: 'trending_up',
      details: [
        { label: 'Zamanında', value: '85%' },
        { label: 'Geç', value: '7%' },
        { label: 'İptal', value: '8%' }
      ]
    },
    {
      title: 'Ortalama Tepki Süresi',
      value: '2.5 saat',
      trend: '-15%',
      icon: 'schedule',
      details: [
        { label: 'İlk Yanıt', value: '1.2 saat' },
        { label: 'Çözüm', value: '3.8 saat' }
      ]
    },
    {
      title: 'Kaynak Kullanımı',
      value: '78%',
      trend: '+2%',
      icon: 'people',
      details: [
        { label: 'Aktif', value: '65%' },
        { label: 'Yedek', value: '13%' }
      ]
    }
  ];

  // Görev Durumu Dağılımı (Pie Chart)
  public pieOptions = {
    series: [35, 45, 20] as ApexNonAxisChartSeries,
    chart: {
      id: 'status-chart',
      type: 'donut' as const,
      height: 350
    },
    labels: ['Tamamlandı', 'Devam Ediyor', 'Beklemede'],
    colors: ['#4CAF50', '#2196F3', '#FFC107'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: 'bottom' }
      }
    }]
  };

  // Görev Trendleri (Line Chart)
  public chartOptions = {
    series: [{
      name: "Tamamlanan Görevler",
      data: [25, 35, 32, 45, 52, 48, 55, 60]
    }],
    chart: {
      id: 'trend-chart',
      type: 'area' as const,
      height: 350,
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const },
    xaxis: {
      categories: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos']
    },
    tooltip: {
      x: { format: 'dd MMM yyyy' }
    }
  };

  // Öncelik Dağılımı (Bar Chart)
  public barOptions = {
    series: [{
      name: 'Görev Sayısı',
      data: [12, 28, 15]
    }],
    chart: {
      id: 'priority-chart',
      type: 'bar' as const,
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        borderRadius: 4
      }
    },
    colors: ['#F44336', '#FF9800', '#4CAF50'],
    xaxis: {
      categories: ['Yüksek', 'Orta', 'Düşük']
    },
    dataLabels: {
      enabled: true
    }
  };
} 