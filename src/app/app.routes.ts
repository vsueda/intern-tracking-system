import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ChallengeManagementComponent } from './features/dashboard/pages/challenge-management/challenge-management.component';
import { ProjectsComponent } from './features/dashboard/pages/projects/projects.component';
import { ProjectDetailComponent } from './features/dashboard/pages/projects/project-detail/project-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes')
      .then(m => m.DASHBOARD_ROUTES)
  },
  {
    path: 'dashboard/challenge-management',
    component: ChallengeManagementComponent,
    // Gerekli guard'ları ekleyin (örn: admin kontrolü)
  },
  {
    path: 'dashboard/projects',
    children: [
      { path: '', component: ProjectsComponent },
      { path: ':id', component: ProjectDetailComponent }
    ]
  }
];