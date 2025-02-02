import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mentor-profile-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.mentor.name }}</h2>
    <mat-dialog-content>
      <div class="mentor-profile">
        <img [src]="data.mentor.imageUrl" [alt]="data.mentor.name" class="profile-image">
        
        <div class="profile-info">
          <h3>{{ data.mentor.title }}</h3>
          <p class="company">{{ data.mentor.company }}</p>
          
          <div class="section">
            <h4>Uzmanlık Alanları</h4>
            <mat-chip-set>
              <mat-chip *ngFor="let skill of data.mentor.expertise">
                {{ skill }}
              </mat-chip>
            </mat-chip-set>
          </div>
          
          <div class="section">
            <h4>Deneyim</h4>
            <p>{{ data.mentor.experience }} yıl</p>
          </div>
          
          <div class="section">
            <h4>Değerlendirme</h4>
            <div class="rating">
              <mat-icon *ngFor="let star of [1,2,3,4,5]"
                       [class.filled]="star <= data.mentor.rating">
                star
              </mat-icon>
              <span>{{ data.mentor.rating }}/5</span>
            </div>
          </div>
        </div>
      </div>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end">
      <button mat-button (click)="onClose()">Kapat</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .mentor-profile {
      display: flex;
      gap: 24px;
      padding: 16px 0;
    }

    .profile-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }

    .profile-info {
      flex: 1;
      
      h3 {
        margin: 0;
        color: #333;
      }
      
      .company {
        color: #666;
        margin-bottom: 24px;
      }
    }

    .section {
      margin: 16px 0;
      
      h4 {
        margin: 0 0 8px;
        color: #666;
      }
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 4px;
      
      mat-icon {
        color: #ccc;
        
        &.filled {
          color: #ffd700;
        }
      }
    }
  `]
})
export class MentorProfileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MentorProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mentor: any }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
} 