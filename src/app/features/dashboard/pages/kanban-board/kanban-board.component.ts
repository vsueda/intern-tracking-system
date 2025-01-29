import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../../../core/models/project.model';

interface KanbanItem {
  id: number;
  title: string;
  description: string;
  assignee: string;
  dueDate: string | number | Date;
  priority: 'Düşük' | 'Orta' | 'Yüksek';
}

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, DragDropModule],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  todo: KanbanItem[] = [];
  inProgress: KanbanItem[] = [];
  done: KanbanItem[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProjects('1').subscribe((projects: Project[]) => {
        this.todo = projects
          .filter(p => p.status === 'beklemede')
          .map(p => ({
            id: Number(p.id),
            title: p.title,
            description: p.description,
            assignee: p.mentorId || 'Atanmamış',
            dueDate: p.endDate,  // deadline yerine endDate kullanıyoruz
            priority: this.getPriority(p.progress)
          }));
    
        this.inProgress = projects
          .filter(p => p.status === 'devam-ediyor')
          .map(p => ({
            id: Number(p.id),
            title: p.title,
            description: p.description,
            assignee: p.mentorId || 'Atanmamış',
            dueDate: p.endDate,  // deadline yerine endDate kullanıyoruz
            priority: this.getPriority(p.progress)
          }));
    
        this.done = projects
          .filter(p => p.status === 'tamamlandı')
          .map(p => ({
            id: Number(p.id),
            title: p.title,
            description: p.description,
            assignee: p.mentorId || 'Atanmamış',
            dueDate: p.endDate,  // deadline yerine endDate kullanıyoruz
            priority: this.getPriority(p.progress)
          }));
      });
  }

  private getPriority(progress: number | undefined): 'Düşük' | 'Orta' | 'Yüksek' {
    if (!progress || progress < 30) return 'Yüksek';
    if (progress < 70) return 'Orta';
    return 'Düşük';
  }

  drop(event: CdkDragDrop<KanbanItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
} 