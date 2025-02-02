import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MentorMatchingService } from '../../services/mentor-matching.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MentorRequestDialogComponent } from '../../components/mentor-request-dialog/mentor-request-dialog.component';
import { MentorProfileDialogComponent } from '../../components/mentor-profile-dialog/mentor-profile-dialog.component';


interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  experience: number;
  rating: number;
  availability: boolean;
  imageUrl: string;
  matchScore: number;
}

@Component({
  selector: 'app-mentor-matching',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './mentor-matching.component.html',
  styleUrls: ['./mentor-matching.component.scss']
})
export class MentorMatchingComponent implements OnInit {
  searchText = '';
  selectedExpertise: string[] = [];
  sortBy = 'match';
  mentors: Mentor[] = [];
  filteredMentors: Mentor[] = [];

  expertiseAreas = [
    'Angular',
    'React',
    'Vue.js',
    'Node.js',
    'Python',
    'Java',
    'C#',
    'DevOps',
    'Cloud Computing',
    'Machine Learning'
  ];

  constructor(
    private mentorMatchingService: MentorMatchingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.mentorMatchingService.getMentors().subscribe(mentors => {
      this.mentors = mentors;
      this.filterMentors();
    });
  }

  filterMentors() {
    let filtered = [...this.mentors];

    // Metin araması
    if (this.searchText.trim()) {
      const searchTerm = this.searchText.toLowerCase().trim();
      filtered = filtered.filter(mentor => 
        mentor.name.toLowerCase().includes(searchTerm) ||
        mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm))
      );
    }

    // Uzmanlık alanı filtresi
    if (this.selectedExpertise.length > 0) {
      filtered = filtered.filter(mentor =>
        mentor.expertise.some(skill => this.selectedExpertise.includes(skill))
      );
    }

    // Sıralama
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        default:
          return 0;
      }
    });

    this.filteredMentors = filtered;
  }

  getMatchScoreColor(score: number): string {
    if (score >= 90) return '#4CAF50';
    if (score >= 70) return '#8BC34A';
    if (score >= 50) return '#FFC107';
    return '#FF5722';
  }

  sendMentorRequest(mentorId: string) {
    const dialogRef = this.dialog.open(MentorRequestDialogComponent, {
      width: '500px',
      data: {
        mentor: this.mentors.find(m => m.id === mentorId)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mentorMatchingService.sendMentorRequest(mentorId, result.message).subscribe(
          response => {
            this.snackBar.open('Mentorluk talebi başarıyla gönderildi!', 'Tamam', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          },
          error => {
            this.snackBar.open('Talep gönderilirken bir hata oluştu.', 'Tamam', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          }
        );
      }
    });
  }

  viewMentorProfile(mentorId: string) {
    const mentor = this.mentors.find(m => m.id === mentorId);
    if (mentor) {
      this.dialog.open(MentorProfileDialogComponent, {
        width: '700px',
        data: { mentor }
      });
    }
  }
} 