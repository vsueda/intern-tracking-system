import { Component, Input, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Chart, registerables } from 'chart.js';

// Chart.js'in tüm bileşenlerini kaydet
Chart.register(...registerables);

@Component({
  selector: 'app-project-charts',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Proje Metrikleri</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <canvas #chartCanvas></canvas>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 1rem;
    }
    mat-card-content {
      height: 400px;
      position: relative;
    }
    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  `]
})
export class ProjectChartsComponent implements AfterViewInit {
  @Input() projectId?: string;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Sadece tarayıcı ortamında çalıştır
      setTimeout(() => {
        this.createChart();
      }, 0);
    }
  }

  private createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
          datasets: [
            {
              label: 'Tamamlanan Görevler (%)',
              data: [10, 41, 35, 51, 49, 62],
              fill: true,
              borderColor: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              tension: 0.4,
              yAxisID: 'y'
            },
            {
              label: 'Commit Sayısı',
              data: [5, 15, 20, 25, 30, 35],
              fill: false,
              borderColor: '#2196F3',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              tension: 0.4,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index' as const,
            intersect: false,
          },
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: 'Proje İlerleme Metrikleri'
            }
          },
          scales: {
            y: {
              type: 'linear' as const,
              display: true,
              position: 'left' as const,
              title: {
                display: true,
                text: 'Tamamlanma Yüzdesi (%)'
              },
              max: 100
            },
            y1: {
              type: 'linear' as const,
              display: true,
              position: 'right' as const,
              title: {
                display: true,
                text: 'Commit Sayısı'
              },
              grid: {
                drawOnChartArea: false
              }
            }
          }
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}