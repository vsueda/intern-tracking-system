import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MentorMatchingService } from '../../services/mentor-matching.service';

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
    MatTooltipModule
  ],
  templateUrl: './mentor-matching.component.html',
  styleUrls: ['./mentor-matching.component.scss']
})
export class MentorMatchingComponent implements OnInit {
  mentors: Mentor[] = [];

  constructor(private mentorMatchingService: MentorMatchingService) {}

  ngOnInit() {
    this.loadMentors();
  }

  getMatchScoreColor(score: number): string {
    if (score >= 90) return '#4CAF50';
    if (score >= 75) return '#8BC34A';
    if (score >= 60) return '#FFC107';
    return '#FF5722';
  }

  private loadMentors() {
    this.mentorMatchingService.getMentors().subscribe(data => {
      this.mentors = data;
    });
  }

  sendMentorRequest(mentorId: string) {
    const studentId = '1'; // Şimdilik sabit ID
    this.mentorMatchingService.sendMentorRequest(mentorId, studentId).subscribe(response => {
      if (response) {
        console.log(`${mentorId} ID'li mentora talep gönderildi`);
      } else {
        console.error(`${mentorId} ID'li mentora talep gönderilirken bir hata oluştu`);
      }
    });
  }

  viewMentorProfile(mentorId: string) {
    this.mentorMatchingService.getMentorById(mentorId).subscribe(mentor => {
      if (mentor) {
        console.log(`${mentorId} ID'li mentorun profili açılıyor`);
      } else {
        console.error(`${mentorId} ID'li mentor bulunamadı`);
      }
    });
  }
} 