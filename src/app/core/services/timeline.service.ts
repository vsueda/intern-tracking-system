import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimelineEvent, Milestone } from '../models/timeline.model';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private events: TimelineEvent[] = [
    {
      id: '1',
      type: 'milestone',
      title: 'Proje Başlangıcı',
      description: 'Proje gereksinimleri belirlendi ve ilk toplantı yapıldı.',
      date: new Date('2024-03-01'),
      projectId: '1',
      userId: '1',
      userType: 'student',
      milestone: {
        id: '1',
        title: 'Proje Planlaması',
        description: 'Proje planı ve zaman çizelgesi oluşturulacak',
        dueDate: new Date('2024-03-15'),
        completed: true,
        projectId: '1'
      }
    },
    {
      id: '2',
      type: 'feedback',
      title: 'Mentor Değerlendirmesi',
      description: 'Frontend geliştirmeleri başarılı. Responsive tasarıma dikkat edilmeli.',
      date: new Date('2024-03-10'),
      projectId: '1',
      userId: '2',
      userType: 'mentor'
    },
    {
      id: '3',
      type: 'update',
      title: 'API Entegrasyonu',
      description: 'Backend servisleri ile bağlantı kuruldu, veri akışı sağlandı.',
      date: new Date('2024-03-20'),
      projectId: '1',
      userId: '1',
      userType: 'student'
    },
    {
      id: '4',
      type: 'milestone',
      title: 'Test Aşaması',
      description: 'Unit testler ve end-to-end testler yazıldı.',
      date: new Date('2024-03-25'),
      projectId: '1',
      userId: '1',
      userType: 'student',
      milestone: {
        id: '2',
        title: 'Test Coverage',
        description: 'Kod coverage oranı %80 üzerine çıkarılacak',
        dueDate: new Date('2024-04-01'),
        completed: false,
        projectId: '1'
      }
    },
    {
      id: '5',
      type: 'feedback',
      title: 'Code Review',
      description: 'Kod kalitesi iyi durumda. Bazı performans iyileştirmeleri önerildi.',
      date: new Date('2024-03-28'),
      projectId: '1',
      userId: '2',
      userType: 'mentor'
    }
  ];

  private milestones: Milestone[] = [
    {
      id: '1',
      title: 'Proje Planlaması',
      description: 'Proje planı ve zaman çizelgesi oluşturulacak',
      dueDate: new Date('2024-03-15'),
      completed: true,
      projectId: '1'
    },
    {
      id: '2',
      title: 'Test Coverage',
      description: 'Kod coverage oranı %80 üzerine çıkarılacak',
      dueDate: new Date('2024-04-01'),
      completed: false,
      projectId: '1'
    },
    {
      id: '3',
      title: 'Deployment',
      description: 'Uygulama production ortamına deploy edilecek',
      dueDate: new Date('2024-04-15'),
      completed: false,
      projectId: '1'
    },
    {
      id: '4',
      title: 'Dokümantasyon',
      description: 'API ve kullanıcı dokümantasyonu hazırlanacak',
      dueDate: new Date('2024-04-20'),
      completed: false,
      projectId: '1'
    }
  ];

  private eventsSubject = new BehaviorSubject<TimelineEvent[]>(this.events);
  private milestonesSubject = new BehaviorSubject<Milestone[]>(this.milestones);

  getProjectEvents(projectId: string): Observable<TimelineEvent[]> {
    const projectEvents = this.events.filter(e => e.projectId === projectId);
    return new BehaviorSubject<TimelineEvent[]>(projectEvents).asObservable();
  }

  getProjectMilestones(projectId: string): Observable<Milestone[]> {
    const projectMilestones = this.milestones.filter(m => m.projectId === projectId);
    return new BehaviorSubject<Milestone[]>(projectMilestones).asObservable();
  }

  addEvent(event: TimelineEvent): void {
    this.events.push(event);
    this.eventsSubject.next(this.events);
  }

  addMilestone(milestone: Milestone): void {
    this.milestones.push(milestone);
    this.milestonesSubject.next(this.milestones);

    // Milestone'u timeline'a da ekle
    const timelineEvent: TimelineEvent = {
      id: Date.now().toString(),
      type: 'milestone',
      title: `Yeni Milestone: ${milestone.title}`,
      description: milestone.description,
      date: new Date(),
      projectId: milestone.projectId,
      userId: '1', // Şimdilik sabit
      userType: 'student',
      milestone
    };
    this.addEvent(timelineEvent);
  }

  updateMilestone(milestone: Milestone): void {
    const index = this.milestones.findIndex(m => m.id === milestone.id);
    if (index !== -1) {
      this.milestones[index] = milestone;
      this.milestonesSubject.next(this.milestones);

      // Timeline'a güncelleme eventi ekle
      const timelineEvent: TimelineEvent = {
        id: Date.now().toString(),
        type: 'update',
        title: `Milestone Güncellendi: ${milestone.title}`,
        description: `Milestone durumu: ${milestone.completed ? 'Tamamlandı' : 'Devam Ediyor'}`,
        date: new Date(),
        projectId: milestone.projectId,
        userId: '1', // Şimdilik sabit
        userType: 'student'
      };
      this.addEvent(timelineEvent);
    }
  }
} 