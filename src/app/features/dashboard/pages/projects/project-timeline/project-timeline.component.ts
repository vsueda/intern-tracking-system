import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule, MatChipOption } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimelineService } from '../../../../../core/services/timeline.service';
import { TimelineEvent, Milestone } from '../../../../../core/models/timeline.model';
import { TimelineDetailDialogComponent } from './timeline-detail-dialog/timeline-detail-dialog.component';

@Component({
  selector: 'app-project-timeline',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
    MatChipsModule,
    MatChipOption,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './project-timeline.component.html',
  styleUrls: ['./project-timeline.component.scss']
})
export class ProjectTimelineComponent implements OnInit {
  @Input() projectId!: string;
  
  events: TimelineEvent[] = [];
  milestones: Milestone[] = [];
  progress = 0;

  constructor(
    private timelineService: TimelineService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadTimeline();
    this.loadMilestones();
  }

  loadTimeline() {
    this.timelineService.getProjectEvents(this.projectId).subscribe(events => {
      this.events = events.sort((a, b) => b.date.getTime() - a.date.getTime());
    });
  }

  loadMilestones() {
    this.timelineService.getProjectMilestones(this.projectId).subscribe(milestones => {
      this.milestones = milestones;
      this.calculateProgress();
    });
  }

  calculateProgress() {
    if (this.milestones.length === 0) return;
    const completed = this.milestones.filter(m => m.completed).length;
    this.progress = (completed / this.milestones.length) * 100;
  }

  toggleMilestone(milestone: Milestone) {
    const updated = { ...milestone, completed: !milestone.completed };
    this.timelineService.updateMilestone(updated);
  }

  getEventIcon(type: string): string {
    switch (type) {
      case 'milestone': return 'flag';
      case 'update': return 'update';
      case 'feedback': return 'comment';
      case 'message': return 'message';
      default: return 'event';
    }
  }

  openDetailedTimeline() {
    this.dialog.open(TimelineDetailDialogComponent, {
      width: '900px',
      maxHeight: '90vh',
      data: {
        events: this.events,
        milestones: this.milestones,
        progress: this.progress
      }
    });
  }
} 