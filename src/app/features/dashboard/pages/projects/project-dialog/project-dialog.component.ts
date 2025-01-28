import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '../../../../../core/models/project.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-project-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent {
  projectForm: FormGroup;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  technologies: string[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project?: Project }
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      githubLink: [''],
      liveLink: [''],
      status: ['devam-ediyor', Validators.required],
      imageUrl: ['']
    });

    if (data.project) {
      this.projectForm.patchValue(data.project);
      this.technologies = [...data.project.technologies];
    }
  }

  addTechnology(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.technologies.push(value);
    }
    event.chipInput!.clear();
  }

  removeTechnology(tech: string): void {
    const index = this.technologies.indexOf(tech);
    if (index >= 0) {
      this.technologies.splice(index, 1);
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;
      this.dialogRef.close({
        ...formValue,
        technologies: this.technologies
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Normalde burada dosya yükleme servisi kullanılır
      // Şimdilik fake URL oluşturuyoruz
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.projectForm.patchValue({
          imageUrl: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }
} 