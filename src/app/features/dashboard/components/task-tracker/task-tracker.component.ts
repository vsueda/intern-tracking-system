import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

interface TaskMetric {
  title: string;
  count: number;
  icon: string;
  color: string;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

interface ActiveTask {
  id: number;
  title: string;
  description: string;
  progress: number;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-task-tracker',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.scss']
})
export class TaskTrackerComponent implements OnInit {
  metrics: TaskMetric[] = [
    {
      title: 'Aktif Görevler',
      count: 12,
      icon: 'assignment',
      color: '#2196F3',
      trend: 'up',
      percentage: 15
    },
    {
      title: 'Tamamlanan',
      count: 45,
      icon: 'check_circle',
      color: '#4CAF50',
      trend: 'up',
      percentage: 23
    },
    {
      title: 'Bekleyen',
      count: 8,
      icon: 'pending',
      color: '#FF9800',
      trend: 'down',
      percentage: 5
    },
    {
      title: 'Geciken',
      count: 3,
      icon: 'warning',
      color: '#F44336',
      trend: 'stable',
      percentage: 0
    }
  ];

  activeTasks: ActiveTask[] = [
    {
      id: 1,
      title: 'Backend API Geliştirme',
      description: 'REST API endpoints oluşturma',
      progress: 75,
      dueDate: new Date('2024-04-15'),
      priority: 'high'
    },
    {
      id: 2,
      title: 'Frontend Dashboard',
      description: 'Kullanıcı arayüzü tasarımı',
      progress: 45,
      dueDate: new Date('2024-04-20'),
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Database Optimizasyonu',
      description: 'Performans iyileştirmeleri',
      progress: 30,
      dueDate: new Date('2024-04-25'),
      priority: 'low'
    }
  ];

  ngOnInit() {
    // Gerçek veriler API'den çekilecek
    this.loadTaskMetrics();
    this.loadActiveTasks();
  }

  private loadTaskMetrics() {
    // API çağrısı yapılacak
  }

  private loadActiveTasks() {
    // API çağrısı yapılacak
  }
} 