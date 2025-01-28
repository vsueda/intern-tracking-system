export interface ProjectMessage {
  id: string;
  projectId: string;
  senderId: string;
  senderType: 'mentor' | 'student';
  message: string;
  timestamp: Date;
  attachments?: string[];
  isRead: boolean;
  relatedMilestoneId?: string;
  quotedMessageId?: string;
  senderAvatar?: string;
} 