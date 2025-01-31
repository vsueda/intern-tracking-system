import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" mode="side" opened>
        <mat-toolbar>Staj Portalı</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="overview" routerLinkActive="active">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Genel Bakış</span>
          </a>
          <a mat-list-item routerLink="projects" routerLinkActive="active">
            <mat-icon matListItemIcon>folder</mat-icon>
            <span matListItemTitle>Projeler</span>
          </a>
          <a mat-list-item routerLink="tasks" routerLinkActive="active">
            <mat-icon matListItemIcon>assignment</mat-icon>
            <span matListItemTitle>İş Takibi</span>
          </a>
          <a mat-list-item routerLink="code-challenge" routerLinkActive="active">
            <mat-icon matListItemIcon>code</mat-icon>
            <span matListItemTitle>Kod Challenge</span>
          </a>
          <a mat-list-item routerLink="challenge-management" routerLinkActive="active">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Challenge Yönetimi</span>
          </a>
          <a mat-list-item routerLink="mentors" routerLinkActive="active">
            <mat-icon matListItemIcon>people</mat-icon>
            <span matListItemTitle>Mentorlar</span>
          </a>
          <a mat-list-item routerLink="communication" routerLinkActive="active">
            <mat-icon matListItemIcon>chat</mat-icon>
            <span matListItemTitle>İletişim</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }
    
    .sidenav {
      width: 250px;
      background: #f5f5f5;
    }

    .active {
      background-color: #e3f2fd !important;
      color: #1976d2 !important;
      border-left: 4px solid #1976d2;
    }

    .active mat-icon {
      color: #1976d2;
    }

    mat-toolbar {
      border-bottom: 1px solid rgba(0,0,0,0.12);
    }

    mat-sidenav-content {
      padding: 20px;
      background: #fafafa;
    }

    a[mat-list-item] {
      border-left: 4px solid transparent;
    }
  `]
})
export class DashboardLayoutComponent {} 