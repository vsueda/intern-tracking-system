import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface GanttTask {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  dependencies?: number[];
}

@Component({
  selector: 'app-project-gantt',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule],
  template: `
    <div class="gantt-container">
      <div class="gantt-header">
        <div class="task-info">Görev</div>
        <div class="timeline">
          <div *ngFor="let date of timelineDates" class="date-column">
            {{ date | date:'dd MMM' }}
          </div>
        </div>
      </div>
      
      <div class="gantt-body">
        <div *ngFor="let task of tasks" class="task-row">
          <div class="task-info">
            <h4>{{ task.title }}</h4>
            <mat-progress-bar mode="determinate" [value]="task.progress"></mat-progress-bar>
          </div>
          <div class="timeline">
            <div class="task-bar" 
                 [style.left.%]="getTaskStart(task)"
                 [style.width.%]="getTaskWidth(task)"
                 [style.background-color]="getTaskColor(task.progress)">
              {{ task.progress }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .gantt-container {
      width: 100%;
      overflow-x: auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .gantt-header {
      display: flex;
      border-bottom: 1px solid #eee;
      position: sticky;
      top: 0;
      background: white;
      z-index: 1;
    }

    .task-info {
      width: 200px;
      padding: 12px;
      border-right: 1px solid #eee;
    }

    .timeline {
      display: flex;
      flex: 1;
      position: relative;
    }

    .date-column {
      flex: 1;
      padding: 12px;
      text-align: center;
      border-right: 1px solid #eee;
      min-width: 100px;
    }

    .gantt-body {
      position: relative;
    }

    .task-row {
      display: flex;
      border-bottom: 1px solid #eee;
      min-height: 60px;
    }

    .task-row .task-info {
      padding: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;

      h4 {
        margin: 0;
        font-size: 14px;
      }
    }

    .task-row .timeline {
      padding: 8px 0;
      position: relative;
    }

    .task-bar {
      position: absolute;
      height: 30px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      transition: all 0.3s ease;

      &:hover {
        opacity: 0.9;
        transform: translateY(-50%) scale(1.02);
      }
    }
  `]
})
export class ProjectGanttComponent implements OnInit {
  @Input() projectId?: string;

  tasks: GanttTask[] = [
    {
      id: 1,
      title: 'Proje Başlangıcı',
      startDate: new Date(2024, 2, 1),
      endDate: new Date(2024, 2, 3),
      progress: 60
    },
    {
      id: 2,
      title: 'Analiz',
      startDate: new Date(2024, 2, 4),
      endDate: new Date(2024, 2, 8),
      progress: 40,
      dependencies: [1]
    },
    {
      id: 3,
      title: 'Backend Geliştirme',
      startDate: new Date(2024, 2, 9),
      endDate: new Date(2024, 2, 18),
      progress: 20,
      dependencies: [2]
    },
    {
      id: 4,
      title: 'Frontend Geliştirme',
      startDate: new Date(2024, 2, 19),
      endDate: new Date(2024, 2, 28),
      progress: 0,
      dependencies: [3]
    }
  ];

  timelineDates: Date[] = [];

  ngOnInit() {
    this.generateTimelineDates();
  }

  generateTimelineDates() {
    const startDate = new Date(Math.min(...this.tasks.map(t => t.startDate.getTime())));
    const endDate = new Date(Math.max(...this.tasks.map(t => t.endDate.getTime())));
    
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    this.timelineDates = dates;
  }

  getTaskStart(task: GanttTask): number {
    const totalDays = this.timelineDates.length;
    const taskStart = task.startDate.getTime();
    const timelineStart = this.timelineDates[0].getTime();
    return ((taskStart - timelineStart) / (24 * 60 * 60 * 1000)) * (100 / totalDays);
  }

  getTaskWidth(task: GanttTask): number {
    const totalDays = this.timelineDates.length;
    const duration = (task.endDate.getTime() - task.startDate.getTime()) / (24 * 60 * 60 * 1000);
    return (duration * 100) / totalDays;
  }

  getTaskColor(progress: number): string {
    if (progress === 100) return '#4CAF50';
    if (progress >= 60) return '#8BC34A';
    if (progress >= 30) return '#FFC107';
    return '#FF5722';
  }
} 