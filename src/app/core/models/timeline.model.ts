export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  projectId: string;
}

export interface TimelineEvent {
  id: string;
  type: 'milestone' | 'update' | 'feedback' | 'message';
  title: string;
  description: string;
  date: Date;
  projectId: string;
  milestone?: Milestone;
  userId: string;
  userType: 'student' | 'mentor';
} 