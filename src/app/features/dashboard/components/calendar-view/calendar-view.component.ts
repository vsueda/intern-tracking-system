import { Component, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import trLocale from '@fullcalendar/core/locales/tr';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FullCalendarModule
  ],
  template: `
    <div class="calendar-container" *ngIf="isBrowser">
      <div class="calendar-header">
        <h2>Görev Takvimi</h2>
        <div class="calendar-actions">
          <button mat-icon-button (click)="prev()">
            <mat-icon>chevron_left</mat-icon>
          </button>
          <button mat-flat-button color="primary" (click)="today()">
            Bugün
          </button>
          <button mat-icon-button (click)="next()">
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>
      </div>
      <div class="calendar-content">
        <full-calendar 
          #calendar 
          [options]="calendarOptions">
        </full-calendar>
      </div>
    </div>
  `,
  styles: [`
    .calendar-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 16px;
      box-sizing: border-box;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      h2 {
        margin: 0;
        font-size: 1.5rem;
      }

      .calendar-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    .calendar-content {
      flex: 1;
      min-height: 600px;
      background: white;
      border-radius: 4px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);

      ::ng-deep {
        .fc {
          height: 100%;
        }

        .fc-toolbar {
          display: none;
        }

        .fc-view-harness {
          height: 100% !important;
        }

        .fc-daygrid-body {
          height: 100% !important;
        }

        .fc-scrollgrid {
          border: none;
        }

        .fc-scrollgrid-section > td {
          border: 1px solid #ddd;
        }

        .fc-day {
          background: white;
        }

        .fc-day-today {
          background-color: rgba(33, 150, 243, 0.1) !important;
        }

        .fc-event {
          border: none;
          padding: 4px 8px;
          margin: 2px 0;
          border-radius: 4px;
          font-size: 0.875rem;

          &:hover {
            opacity: 0.9;
          }
        }
      }
    }
  `]
})
export class CalendarViewComponent {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isBrowser = true;
      });
    }
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: trLocale,
    editable: true,
    selectable: true,
    weekends: true,
    initialDate: new Date(),
    fixedWeekCount: false,
    showNonCurrentDates: false,
    events: [
      {
        title: 'Frontend Geliştirme',
        start: '2024-03-15',
        end: '2024-03-18',
        color: '#4CAF50'
      },
      {
        title: 'Backend API Entegrasyonu',
        start: '2024-03-20',
        end: '2024-03-22',
        color: '#2196F3'
      },
      {
        title: 'Test ve Hata Düzeltme',
        start: '2024-03-25',
        color: '#FFC107'
      },
      {
        title: 'Proje Teslimi',
        start: '2024-03-29',
        color: '#F44336'
      }
    ],
    eventClick: (info) => {
      if (isPlatformBrowser(this.platformId)) {
        console.log('Event clicked:', info.event);
      }
    },
    select: (info) => {
      if (isPlatformBrowser(this.platformId)) {
        console.log('Date selected:', info);
      }
    }
  };

  prev() {
    if (isPlatformBrowser(this.platformId)) {
      this.calendarComponent?.getApi().prev();
    }
  }

  next() {
    if (isPlatformBrowser(this.platformId)) {
      this.calendarComponent?.getApi().next();
    }
  }

  today() {
    if (isPlatformBrowser(this.platformId)) {
      this.calendarComponent?.getApi().today();
    }
  }
} 