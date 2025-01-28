import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../../../core/models/project.model';
import { ProjectTimelineComponent } from './project-timeline/project-timeline.component';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatProgressBarModule,
    ProjectTimelineComponent,
    ProjectDialogComponent
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  displayedProjects: Project[] = [];
  searchText = '';
  selectedStatus: string = 'all';
  selectedProject?: Project | null;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    // Şimdilik sabit bir studentId kullanıyoruz
    const studentId = '1';
    this.projectService.getProjects(studentId).subscribe(projects => {
      this.projects = projects;
      this.filterProjects();
    });
  }

  openProjectDialog(project?: Project): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '600px',
      data: { project }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (project) {
          this.projectService.updateProject({
            ...project,
            ...result,
            updatedAt: new Date()
          });
        } else {
          const newProject: Project = {
            id: Date.now().toString(),
            ...result,
            createdAt: new Date(),
            updatedAt: new Date(),
            studentId: '1' // Şimdilik sabit
          };
          this.projectService.addProject(newProject);
        }
      }
    });
  }

  deleteProject(id: string) {
    if (confirm('Projeyi silmek istediğinize emin misiniz?')) {
      this.projectService.deleteProject(id);
    }
  }

  filterProjects() {
    this.displayedProjects = this.projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
                          project.description.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatus = this.selectedStatus === 'all' || project.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  onSearch(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value;
    this.filterProjects();
  }

  onStatusChange(status: string) {
    this.selectedStatus = status;
    this.filterProjects();
  }

  openProjectDetail(projectId: string): void {
    this.selectedProject = this.displayedProjects.find(p => p.id === projectId);
    this.router.navigate(['/dashboard/projects', projectId]);
  }

  showTimeline(project: Project): void {
    this.selectedProject = this.selectedProject?.id === project.id ? null : project;
  }

  get totalProjects(): number {
    return this.projects.length;
  }

  get activeProjects(): number {
    return this.projects.filter(p => p.status === 'devam-ediyor').length;
  }

  get completedProjects(): number {
    return this.projects.filter(p => p.status === 'tamamlandı').length;
  }

  get techDistribution(): { name: string; count: number; percentage: number }[] {
    const techCount = new Map<string, number>();
    this.projects.forEach(project => {
      project.technologies.forEach(tech => {
        techCount.set(tech, (techCount.get(tech) || 0) + 1);
      });
    });

    return Array.from(techCount.entries()).map(([name, count]) => ({
      name,
      count,
      percentage: (count / this.projects.length) * 100
    })).sort((a, b) => b.count - a.count);
  }

  get sortedByDate(): Project[] {
    return [...this.projects].sort((a, b) => 
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  }

  editProject(project: Project): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '600px',
      data: { project: project }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.updateProject(result);
      }
    });
  }
} 