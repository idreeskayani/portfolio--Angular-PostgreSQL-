import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO } from '../../core/data/portfolio.data';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  mobileProjects = PORTFOLIO.mobileProjects;
  webProjects = PORTFOLIO.webProjects;
}
