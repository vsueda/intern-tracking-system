import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

interface TaskDialogData {
  mode: 'create' | 'edit';
  task?: any;
}

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{data.mode === 'create' ? 'Yeni Görev' : 'Görevi Düzenle'}}</h2>
    <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
      <div mat-dialog-content>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Başlık</mat-label>
          <input matInput formControlName="title" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Açıklama</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Atanan Kişi</mat-label>
          <mat-select formControlName="assignee" required>
            <mat-option value="Ahmet Yılmaz">Ahmet Yılmaz</mat-option>
            <mat-option value="Ayşe Demir">Ayşe Demir</mat-option>
            <mat-option value="Mehmet Kaya">Mehmet Kaya</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Bitiş Tarihi</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="dueDate" required>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Durum</mat-label>
          <mat-select formControlName="status" required>
            <mat-option value="Beklemede">Beklemede</mat-option>
            <mat-option value="Devam Ediyor">Devam Ediyor</mat-option>
            <mat-option value="Tamamlandı">Tamamlandı</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Öncelik</mat-label>
          <mat-select formControlName="priority" required>
            <mat-option value="Düşük">Düşük</mat-option>
            <mat-option value="Orta">Orta</mat-option>
            <mat-option value="Yüksek">Yüksek</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>İlerleme (%)</mat-label>
          <input matInput type="number" formControlName="progress" min="0" max="100" required>
        </mat-form-field>
      </div>

      <div mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">İptal</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!taskForm.valid">
          {{data.mode === 'create' ? 'Oluştur' : 'Güncelle'}}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
    
    mat-form-field {
      margin: 8px;
      width: calc(50% - 16px);
    }
    
    textarea {
      resize: none;
    }
    
    .mat-mdc-dialog-content {
      display: flex;
      flex-wrap: wrap;
    }
  `]
})
export class TaskDialogComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      assignee: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['Beklemede', Validators.required],
      priority: ['Orta', Validators.required],
      progress: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    if (data.mode === 'edit' && data.task) {
      this.taskForm.patchValue(data.task);
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
} 