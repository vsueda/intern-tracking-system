import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../../../core/models/project.model';
import { ProjectTimelineComponent } from '../projects/project-timeline/project-timeline.component';
import { ProjectMessagesComponent } from '../projects/project-messages/project-messages.component';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexFill,
  ApexTooltip,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';
import { ProjectChartsComponent } from '../../components/project-charts/project-charts.component';

interface ActivityLog {
  id: string;
  type: string;
  description: string;
  date: string;
  user: string;
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  stroke: ApexStroke;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    NgApexchartsModule,
    ProjectTimelineComponent,
    ProjectMessagesComponent,
    NgApexchartsModule,
    ProjectChartsComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project?: Project;
  completedTasks = 0;
  totalTasks = 0;
  commitCount = 0;
  activityLogs: ActivityLog[] = [];
  @ViewChild('chart') chart: any;

  public chartOptions: ChartOptions = {
    series: [{
      name: "İlerleme",
      data: [10, 41, 35, 51, 49, 62]
    }],
    chart: {
      id: 'area-datetime',
      type: 'area' as const,
      height: 350,
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    markers: { size: 0 },
    stroke: { curve: 'smooth' as const },
    xaxis: {
      type: 'datetime' as const,
      categories: ['2024-03-01', '2024-03-02', '2024-03-03', '2024-03-04', '2024-03-05', '2024-03-06'],
      tickAmount: 6
    },
    tooltip: {
      x: { format: 'dd MMM yyyy' }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    }
  };

  public pieOptions = {
    series: [44, 55, 13, 43] as ApexNonAxisChartSeries,
    chart: {
      id: 'donut-chart',
      type: 'donut' as const,
      height: 350
    },
    labels: ['Commitler', 'Görevler', 'Geri Bildirimler', 'Güncellemeler'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: 'bottom' }
      }
    }]
  };

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.loadProjectData(projectId);
    });
  }

  private loadProjectData(projectId: string): void {
    this.projectService.getProjectById(projectId).subscribe(project => {
      this.project = project;
      this.loadStatistics(projectId);
      this.loadActivityLogs(projectId);
      this.updateChartData(projectId);
    });
  }

  private loadStatistics(projectId: string): void {
    // Burada gerçek veriler API'den gelecek
    this.projectService.getProjectStatistics(projectId).subscribe((stats: any) => {
      this.completedTasks = stats.completedTasks;
      this.totalTasks = stats.totalTasks;
      this.commitCount = stats.commitCount;
    });
  }

  private loadActivityLogs(projectId: string): void {
    this.projectService.getProjectActivities(projectId).subscribe((logs: any) => {
      this.activityLogs = logs;
    });
  }

  private updateChartData(projectId: string): void {
    this.projectService.getProjectProgress(projectId).subscribe(progress => {
      if (this.chartOptions.series?.[0]) {
        this.chartOptions.series[0].data = progress.values;
      }
      if (this.chartOptions.xaxis) {
        this.chartOptions.xaxis.categories = progress.dates;
      }
    });

    this.projectService.getProjectActivityDistribution(projectId).subscribe(distribution => {
      this.pieOptions.series = [
        distribution.commits,
        distribution.tasks,
        distribution.feedback,
        distribution.updates
      ];
    });
  }

  calculateSpentTime(): number {
    if (!this.project) return 0;
    const start = new Date(this.project.startDate);
    const end = this.project.endDate ? new Date(this.project.endDate) : new Date();
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  getLogIcon(type: string): string {
    switch (type) {
      case 'commit': return 'code';
      case 'milestone': return 'flag';
      case 'feedback': return 'comment';
      case 'update': return 'update';
      default: return 'event';
    }
  }
} 