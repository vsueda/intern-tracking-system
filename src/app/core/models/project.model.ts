export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'devam-ediyor' | 'tamamlandı' | 'beklemede';
  startDate: Date;
  endDate: Date;
  technologies: string[];
  githubUrl?: string;
  liveLink?: string;
  imageUrl?: string;
  progress?: number;
  mentorId?: string;
  studentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  mentorFeedback?: string;
} 