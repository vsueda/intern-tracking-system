import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
        { path: '', redirectTo: 'overview', pathMatch: 'full' },
        { path: 'overview', loadComponent: () => import('./pages/overview/overview.component').then(m => m.OverviewComponent) },
        { path: 'code-editor', loadComponent: () => import('./pages/code-editor/code-editor.component').then(m => m.CodeEditorComponent) },
        // { path: 'projects', loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent) },
        // { path: 'communications', loadComponent: () => import('./pages/communications/communications.component').then(m => m.CommunicationsComponent) },
        // { path: 'events', loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent) }
    ]
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent
  }
]; 