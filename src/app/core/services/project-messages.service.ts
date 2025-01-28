import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ProjectMessage } from '../models/project-message.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectMessagesService {
  private messages: ProjectMessage[] = [
    {
      id: '1',
      projectId: '1',
      senderId: '1',
      senderType: 'student',
      message: 'Merhaba hocam, authentication kısmında JWT implementasyonunu tamamladım. İnceleyebilir misiniz?',
      timestamp: new Date('2024-03-15T10:30:00'),
      isRead: true
    },
    {
      id: '2',
      projectId: '1',
      senderId: '2',
      senderType: 'mentor',
      message: 'Token expiration süresini biraz daha kısa tutabilirsin. Bir de refresh token mekanizması eklersen iyi olur.',
      timestamp: new Date('2024-03-15T11:15:00'),
      isRead: true
    },
    {
      id: '3',
      projectId: '1',
      senderId: '1',
      senderType: 'student',
      message: 'Refresh token için bir PR açtım. İnceleyebilirseniz sevinirim: https://github.com/user/project/pull/15',
      timestamp: new Date('2024-03-15T14:20:00'),
      isRead: true
    },
    {
      id: '4',
      projectId: '1',
      senderId: '2',
      senderType: 'mentor',
      message: 'PR\'ı inceledim, birkaç küçük değişiklik gerekiyor. Commentleri kontrol edebilir misin?',
      timestamp: new Date('2024-03-15T15:45:00'),
      isRead: false
    }
  ];

  private messagesSubject = new BehaviorSubject<ProjectMessage[]>(this.messages);

  // Proje bazlı mesajları getir
  getProjectMessages(projectId: string): Observable<ProjectMessage[]> {
    return this.messagesSubject.pipe(
      map(messages => messages.filter(m => m.projectId === projectId))
    );
  }

  // Yeni mesaj gönder
  sendMessage(message: Omit<ProjectMessage, 'id' | 'timestamp'>): void {
    const newMessage: ProjectMessage = {
      ...message,
      id: Date.now().toString(), // Gerçek uygulamada UUID kullanılabilir
      timestamp: new Date(),
      isRead: false
    };
    
    this.messages.push(newMessage);
    this.messagesSubject.next(this.messages);
  }

  // Mesajı okundu olarak işaretle
  markAsRead(messageId: string): void {
    const message = this.messages.find(m => m.id === messageId);
    if (message) {
      message.isRead = true;
      this.messagesSubject.next(this.messages);
    }
  }

  // Okunmamış mesaj sayısını getir
  getUnreadCount(projectId: string, userId: string): Observable<number> {
    return this.messagesSubject.pipe(
      map(messages => messages.filter(m => 
        m.projectId === projectId && 
        m.senderId !== userId && 
        !m.isRead
      ).length)
    );
  }
} 