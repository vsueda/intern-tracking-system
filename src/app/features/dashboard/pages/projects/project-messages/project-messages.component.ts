import { Component, Input, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { ProjectMessage } from '../../../../../core/models/project-message.model';
import { ProjectMessagesService } from '../../../../../core/services/project-messages.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-messages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  templateUrl: './project-messages.component.html',
  styleUrls: ['./project-messages.component.scss']
})
export class ProjectMessagesComponent implements OnInit, AfterViewChecked {
  @Input() projectId!: string;
  @ViewChild('messagesList') private messagesList!: ElementRef;
  
  messages$!: Observable<ProjectMessage[]>;
  newMessage: string = '';
  currentUserId: string = '1'; // Gerçek uygulamada auth service'den alınacak
  quotedMessage: ProjectMessage | null = null;
  private allMessages: ProjectMessage[] = [];  // Tüm mesajları tutmak için

  constructor(private messagesService: ProjectMessagesService) {}

  ngOnInit(): void {
    this.messages$ = this.messagesService.getProjectMessages(this.projectId);
    
    this.messages$.subscribe(messages => {
      this.allMessages = messages;  // Mesajları saklıyoruz
      console.log('Gelen mesajlar:', messages);
      messages
        .filter(m => !m.isRead && m.senderId !== this.currentUserId)
        .forEach(m => this.messagesService.markAsRead(m.id));
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messagesService.sendMessage({
        projectId: this.projectId,
        senderId: this.currentUserId,
        senderType: 'student',
        message: this.newMessage,
        attachments: [],
        isRead: false,
        quotedMessageId: this.quotedMessage?.id
      });
      this.newMessage = '';
      this.quotedMessage = null;
    }
  }

  attachFile(): void {
    // Dosya ekleme fonksiyonu implementasyonu gelecek
    console.log('Dosya ekleme özelliği eklenecek');
  }

  trackByMessageId(index: number, message: ProjectMessage): string {
    return message.id;
  }

  quoteMessage(message: ProjectMessage): void {
    this.quotedMessage = message;
  }

  cancelQuote(): void {
    this.quotedMessage = null;
  }

  getQuotedMessage(messageId: string): ProjectMessage | undefined {
    return this.allMessages.find(m => m.id === messageId);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesList.nativeElement.scrollTop = this.messagesList.nativeElement.scrollHeight;
    } catch(err) { }
  }
} 