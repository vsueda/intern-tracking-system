import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: '1',
      title: 'E-Ticaret Web Sitesi',
      description: 'Angular ve .NET Core kullanılarak geliştirilmiş tam kapsamlı bir e-ticaret projesi.',
      technologies: ['Angular', 'TypeScript', '.NET Core', 'SQL Server'],
      githubUrl: 'https://github.com/user/e-commerce',
      status: 'devam-ediyor',
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-15'),
      studentId: '1',
      mentorId: '1',
      mentorFeedback: 'Proje iyi ilerliyor, authentication kısmında güvenlik önlemlerini artırmalıyız.',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-06-01'),
      deadline: new Date('2024-06-01')
    },
    {
      id: '2',
      title: 'Task Yönetim Uygulaması',
      description: 'React ve Firebase kullanılarak geliştirilen bir task yönetim uygulaması.',
      technologies: ['React', 'Firebase', 'Material-UI'],
      githubUrl: 'https://github.com/user/task-manager',
      liveLink: 'https://task-manager-demo.web.app',
      status: 'tamamlandı',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-28'),
      studentId: '1',
      mentorId: '2',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-28'),
      deadline: new Date('2024-02-28')
    }
  ];

  private projectsSubject = new BehaviorSubject<Project[]>(this.projects);

  getProjects(studentId?: string): Observable<Project[]> {
    if (studentId) {
      return this.projectsSubject.pipe(
        map(projects => projects.filter(p => p.studentId === studentId))
      );
    }
    return this.projectsSubject.asObservable();
  }

  addProject(project: Project): void {
    this.projects.push(project);
    this.projectsSubject.next(this.projects);
  }

  updateProject(project: Project): void {
    const index = this.projects.findIndex(p => p.id === project.id);
    if (index !== -1) {
      this.projects[index] = project;
      this.projectsSubject.next(this.projects);
    }
  }

  deleteProject(id: string): void {
    this.projects = this.projects.filter(p => p.id !== id);
    this.projectsSubject.next(this.projects);
  }

  getProjectStatistics(projectId: string) {
    return of({
      completedTasks: 8,
      totalTasks: 12,
      commitCount: 45,
      timeSpent: 28
    });
  }

  getProjectActivities(projectId: string) {
    return of([
      {
        type: 'commit',
        message: 'Authentication sistemi güncellendi',
        date: new Date('2024-03-20')
      },
      {
        type: 'milestone',
        message: 'Backend API entegrasyonu tamamlandı',
        date: new Date('2024-03-18')
      },
      {
        type: 'feedback',
        message: 'Code review sonrası düzeltmeler yapıldı',
        date: new Date('2024-03-15')
      },
      {
        type: 'update',
        message: 'Yeni özellikler eklendi',
        date: new Date('2024-03-10')
      }
    ]);
  }

  getProjectProgress(projectId: string) {
    return of({
      dates: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'],
      values: [30, 40, 45, 50, 49, 60]
    });
  }

  getProjectActivityDistribution(projectId: string) {
    return of({
      commits: 44,
      tasks: 55,
      feedback: 13,
      updates: 33
    });
  }

  getProjectById(id: string): Observable<Project> {
    return this.getProjects().pipe(
      map(projects => projects.find(p => p.id === id) as Project)
    );
  }
} 