import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule, MatChipOption } from '@angular/material/chips';
import { TimelineEvent, Milestone } from '../../../../../../core/models/timeline.model';

@Component({
  selector: 'app-timeline-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatChipOption
  ],
  templateUrl: './timeline-detail-dialog.component.html',
  styleUrls: ['./timeline-detail-dialog.component.scss']
})
export class TimelineDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TimelineDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      events: TimelineEvent[],
      milestones: Milestone[],
      progress: number 
    }
  ) {}

  getEventIcon(type: string): string {
    switch (type) {
      case 'milestone': return 'flag';
      case 'update': return 'update';
      case 'feedback': return 'comment';
      case 'message': return 'message';
      default: return 'event';
    }
  }

  getEventColor(type: string): string {
    switch (type) {
      case 'milestone': return '#2196f3';
      case 'update': return '#4caf50';
      case 'feedback': return '#ff9800';
      case 'message': return '#9c27b0';
      default: return '#757575';
    }
  }
} 