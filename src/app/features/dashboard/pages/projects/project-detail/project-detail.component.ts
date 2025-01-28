import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ProjectTimelineComponent } from '../project-timeline/project-timeline.component';
import { ProjectMessagesComponent } from '../project-messages/project-messages.component';
import { ProjectService } from '../../../../../core/services/project.service';
import { Project } from '../../../../../core/models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    ProjectTimelineComponent,
    ProjectMessagesComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project?: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.projectService.getProjects().subscribe(projects => {
        this.project = projects.find((p: any) => p.id === projectId);
      });
    });
  }

  openGithub(): void {
    if (this.project?.githubUrl) {
      window.open(this.project.githubUrl, '_blank');
    }
  }
} 