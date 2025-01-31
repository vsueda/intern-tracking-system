import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Mentor {
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

@Injectable({
  providedIn: 'root'
})
export class MentorMatchingService {
  private mentors: Mentor[] = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      title: 'Senior Software Engineer',
      company: 'Tech Co.',
      expertise: ['Angular', 'Node.js', 'Cloud Computing'],
      experience: 8,
      rating: 4.8,
      availability: true,
      imageUrl: 'assets/mentors/mentor1.jpg',
      matchScore: 95
    },
    // Diğer mentor verileri...
  ];

  getMentors(): Observable<Mentor[]> {
    return of(this.mentors);
  }

  getMentorById(id: string): Observable<Mentor | undefined> {
    return of(this.mentors.find(mentor => mentor.id === id));
  }

  sendMentorRequest(mentorId: string, studentId: string): Observable<boolean> {
    console.log(`Mentorluk talebi gönderildi: Mentor ${mentorId}, Öğrenci ${studentId}`);
    return of(true);
  }
} 