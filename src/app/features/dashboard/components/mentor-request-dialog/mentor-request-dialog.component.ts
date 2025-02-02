import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mentor-request-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Mentorluk Talebi</h2>
    <mat-dialog-content>
      <p>{{ data.mentor.name }} adlı mentora talep göndermek üzeresiniz.</p>
      
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Mesajınız</mat-label>
        <textarea matInput
                  [(ngModel)]="message"
                  rows="4"
                  placeholder="Mentora iletmek istediğiniz mesaj..."></textarea>
      </mat-form-field>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">İptal</button>
      <button mat-flat-button 
              color="primary" 
              [disabled]="!message.trim()"
              (click)="onSubmit()">
        Talebi Gönder
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
  `]
})
export class MentorRequestDialogComponent {
  message = '';

  constructor(
    public dialogRef: MatDialogRef<MentorRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mentor: any }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close({ message: this.message });
  }
} 