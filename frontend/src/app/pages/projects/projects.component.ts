import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  mobileProjects: any[] = [];
  webProjects: any[] = [];

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.portfolioService.getProjects().subscribe(data => {
      this.mobileProjects = data.filter((p: any) => p.category === 'mobile');
      this.webProjects = data.filter((p: any) => p.category === 'web');
      this.cdr.detectChanges();
    });
  }
}
