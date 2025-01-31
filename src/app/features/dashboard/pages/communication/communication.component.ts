import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="communication-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>İletişim</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>İletişim sayfası içeriği burada olacak.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .communication-container {
      padding: 20px;
    }
  `]
})
export class CommunicationComponent {} 