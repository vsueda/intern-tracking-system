import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardLayoutComponent } from './features/dashboard/layout/dashboard-layout.component';
import { KanbanBoardComponent } from './features/dashboard/pages/kanban-board/kanban-board.component';
import { OverviewComponent } from './features/dashboard/pages/overview/overview.component';
import { ProjectsComponent } from './features/dashboard/pages/projects/projects.component';
import { ProjectDetailComponent } from './features/dashboard/pages/project-detail/project-detail.component';
import { CodeEditorComponent } from './features/dashboard/pages/code-editor/code-editor.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { 
        path: '', 
        loadComponent: () => import('./features/dashboard/pages/overview/overview.component')
          .then(m => m.OverviewComponent) 
      },
      { 
        path: 'projects', 
        loadComponent: () => import('./features/dashboard/pages/projects/projects.component')
          .then(m => m.ProjectsComponent) 
      },
      { 
        path: 'projects/:id', 
        loadComponent: () => import('./features/dashboard/pages/project-detail/project-detail.component')
          .then(m => m.ProjectDetailComponent) 
      },
      { 
        path: 'kanban', 
        loadComponent: () => import('./features/dashboard/pages/kanban-board/kanban-board.component')
          .then(m => m.KanbanBoardComponent) 
      },
      { 
        path: 'code-editor', 
        loadComponent: () => import('./features/dashboard/pages/code-editor/code-editor.component')
          .then(m => m.CodeEditorComponent) 
      },
      { 
        path: 'code-editor/:id', 
        loadComponent: () => import('./features/dashboard/pages/code-editor/code-editor.component')
          .then(m => m.CodeEditorComponent) 
      },
      { 
        path: 'challenge-management', 
        loadComponent: () => import('./features/dashboard/pages/challenge-management/challenge-management.component')
          .then(m => m.ChallengeManagementComponent) 
      },
      { 
        path: 'code-challenge', 
        loadComponent: () => import('./features/dashboard/pages/code-editor/code-editor.component')
          .then(m => m.CodeEditorComponent) 
      },
      { 
        path: 'tasks', 
        loadComponent: () => import('./features/dashboard/pages/task-management/task-management.component')
          .then(m => m.TaskManagementComponent) 
      }
    ]
  }
];