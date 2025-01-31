import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { 
        path: '', 
        redirectTo: 'overview', 
        pathMatch: 'full' 
      },
      { 
        path: 'overview', 
        loadComponent: () => import('./pages/overview/overview.component').then(m => m.OverviewComponent) 
      },
      { 
        path: 'projects', 
        loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent) 
      },
      { 
        path: 'tasks', 
        loadComponent: () => import('./pages/task-management/task-management.component').then(m => m.TaskManagementComponent) 
      },
      { 
        path: 'code-challenge', 
        loadComponent: () => import('./pages/code-editor/code-editor.component').then(m => m.CodeEditorComponent) 
      },
      { 
        path: 'challenge-management', 
        loadComponent: () => import('./pages/challenge-management/challenge-management.component').then(m => m.ChallengeManagementComponent) 
      },
      { 
        path: 'mentors', 
        loadComponent: () => import('./pages/mentor-matching/mentor-matching.component').then(m => m.MentorMatchingComponent) 
      },
      { 
        path: 'communication', 
        loadComponent: () => import('./pages/communication/communication.component').then(m => m.CommunicationComponent) 
      }
    ]
  }
]; 