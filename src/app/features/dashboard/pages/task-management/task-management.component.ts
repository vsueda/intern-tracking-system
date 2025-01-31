import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TaskTrackerComponent } from '../../components/task-tracker/task-tracker.component';
import { KanbanBoardComponent } from '../kanban-board/kanban-board.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';
import { TaskReportsComponent } from '../../components/task-reports/task-reports.component';
import { CalendarViewComponent } from '../../components/calendar-view/calendar-view.component';

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  dueDate: Date;
  status: 'Beklemede' | 'Devam Ediyor' | 'Tamamlandı';
  priority: 'Düşük' | 'Orta' | 'Yüksek';
  progress: number;
}

@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
    TaskTrackerComponent,
    KanbanBoardComponent,
    TaskReportsComponent,
    CalendarViewComponent
  ],
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent {
  displayedColumns: string[] = ['title', 'assignee', 'dueDate', 'status', 'priority', 'progress', 'actions'];
  tasks: Task[] = [
    {
      id: 1,
      title: 'Backend API Geliştirme',
      description: 'REST API endpoints oluşturma',
      assignee: 'Ahmet Yılmaz',
      dueDate: new Date('2024-04-15'),
      status: 'Devam Ediyor',
      priority: 'Yüksek',
      progress: 75
    },
    {
      id: 2,
      title: 'Frontend Dashboard',
      description: 'Kullanıcı arayüzü tasarımı',
      assignee: 'Ayşe Demir',
      dueDate: new Date('2024-04-20'),
      status: 'Beklemede',
      priority: 'Orta',
      progress: 45
    },
    {
      id: 3,
      title: 'Database Optimizasyonu',
      description: 'Performans iyileştirmeleri',
      assignee: 'Mehmet Kaya',
      dueDate: new Date('2024-04-25'),
      status: 'Tamamlandı',
      priority: 'Düşük',
      progress: 100
    }
  ];

  constructor(private dialog: MatDialog) {}

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'Yüksek': return 'warn';
      case 'Orta': return 'accent';
      case 'Düşük': return 'primary';
      default: return '';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Tamamlandı': return '#4CAF50';
      case 'Devam Ediyor': return '#2196F3';
      case 'Beklemede': return '#FFC107';
      default: return '#757575';
    }
  }

  addTask() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '800px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Normalde bu veri API'ye gönderilir
        const newTask = {
          id: this.tasks.length + 1,
          ...result
        };
        this.tasks = [...this.tasks, newTask];
      }
    });
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '800px',
      data: { mode: 'edit', task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Normalde bu veri API'ye gönderilir
        this.tasks = this.tasks.map(t => 
          t.id === task.id ? { ...t, ...result } : t
        );
      }
    });
  }

  deleteTask(task: Task) {
    // Normalde bir onay dialogu gösterilir
    if (confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
      // Normalde API'ye delete isteği gönderilir
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    }
  }
} 