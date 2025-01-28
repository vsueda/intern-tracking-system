import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule
  ],
  template: `
    <mat-sidenav-container class="dashboard-container">
      <!-- Sidebar -->
      <mat-sidenav #sidenav mode="side" opened class="dashboard-sidenav">
        <div class="sidenav-header">
          <img src="assets/images/logo.png" alt="Logo" class="logo">
          <h2>Staj Portal</h2>
        </div>

        <mat-nav-list>
          <a mat-list-item routerLink="overview" routerLinkActive="active">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Genel Bakış</span>
          </a>
          
          <a mat-list-item routerLink="code-editor" routerLinkActive="active">
            <mat-icon matListItemIcon>code</mat-icon>
            <span matListItemTitle>Kod Editörü</span>
          </a>
          
          <a mat-list-item routerLink="projects" routerLinkActive="active">
            <mat-icon matListItemIcon>code</mat-icon>
            <span matListItemTitle>Projelerim</span>
          </a>
          
          <a mat-list-item routerLink="communications" routerLinkActive="active">
            <mat-icon matListItemIcon [matBadge]="3" matBadgeColor="accent">chat</mat-icon>
            <span matListItemTitle>İletişim</span>
          </a>
          
          <a mat-list-item routerLink="events" routerLinkActive="active">
            <mat-icon matListItemIcon>event</mat-icon>
            <span matListItemTitle>Etkinlikler</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <!-- Main content -->
      <mat-sidenav-content>
        <!-- Toolbar -->
        <mat-toolbar color="primary" class="dashboard-toolbar">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>

          <span class="toolbar-spacer"></span>

          <button mat-icon-button [matBadge]="2" matBadgeColor="warn">
            <mat-icon>notifications</mat-icon>
          </button>

          <button mat-button [matMenuTriggerFor]="profileMenu" class="profile-button">
            <img src="assets/images/avatar.jpg" alt="Profile" class="profile-image">
            <span>Ahmet Yılmaz</span>
            <mat-icon>arrow_drop_down</mat-icon>
          </button>

          <mat-menu #profileMenu="matMenu">
            <button mat-menu-item>
              <mat-icon>person</mat-icon>
              <span>Profilim</span>
            </button>
            <button mat-menu-item>
              <mat-icon>settings</mat-icon>
              <span>Ayarlar</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <mat-icon>exit_to_app</mat-icon>
              <span>Çıkış Yap</span>
            </button>
          </mat-menu>
        </mat-toolbar>

        <!-- Page content -->
        <div class="dashboard-content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .dashboard-container {
      height: 100vh;
    }

    .dashboard-sidenav {
      width: 260px;
      background: var(--white);
      border-right: 1px solid rgba(0,0,0,0.12);

      .sidenav-header {
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        border-bottom: 1px solid rgba(0,0,0,0.12);

        .logo {
          width: 40px;
          height: 40px;
        }

        h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--primary-color);
        }
      }

      .mat-nav-list {
        padding-top: 1rem;

        .mat-list-item {
          margin: 0.5rem 0;
          border-radius: 0 2rem 2rem 0;
          
          &.active {
            background-color: rgba(79, 70, 229, 0.1);
            color: var(--primary-color);

            .mat-icon {
              color: var(--primary-color);
            }
          }
        }
      }
    }

    .dashboard-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--white);
      color: var(--text-primary);
      border-bottom: 1px solid rgba(0,0,0,0.12);
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .profile-button {
      margin-left: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .profile-image {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .dashboard-content {
      padding: 2rem;
      background-color: var(--background-light);
      min-height: calc(100vh - 64px);
    }
  `]
})
export class DashboardComponent {
  logout() {
    // Implement logout logic
  }
} 