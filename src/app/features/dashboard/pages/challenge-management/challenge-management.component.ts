import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { Challenge } from '../../../../core/models/challenge.model';

@Component({
  selector: 'app-challenge-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [ChallengeService],
  templateUrl: './challenge-management.component.html',
  styleUrls: ['./challenge-management.component.scss'],
  styles: [`
    .challenge-management {
      padding: 1rem;

      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .mat-form-field {
        width: 100%;
      }
    }
  `]
})
export class ChallengeManagementComponent {
  challengeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private challengeService: ChallengeService
  ) {
    this.challengeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      difficulty: ['Kolay', Validators.required],
      category: ['', Validators.required],
      starterCode: ['', Validators.required],
      testCases: this.fb.array([])
    });

    this.addTestCase(); // İlk test senaryosunu ekle
  }

  get testCases() {
    return this.challengeForm.get('testCases') as FormArray;
  }

  addTestCase() {
    const testCase = this.fb.group({
      input: ['', Validators.required],
      expectedOutput: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.testCases.push(testCase);
  }

  removeTestCase(index: number) {
    this.testCases.removeAt(index);
  }

  onSubmit() {
    if (this.challengeForm.valid) {
      const formValue = this.challengeForm.value;
      
      // Test senaryolarındaki input'ları JSON'dan parse et
      const testCases = formValue.testCases.map((testCase: any) => ({
        ...testCase,
        input: JSON.parse(testCase.input)
      }));

      const challenge: Challenge = {
        id: Date.now().toString(), // Basit bir ID oluştur
        ...formValue,
        testCases
      };

      this.challengeService.addChallenge(challenge);
      this.challengeForm.reset();
      this.testCases.clear();
      this.addTestCase();
    }
  }
} 