import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  skillCategories: any[] = [];
  strengths: string[] = [];

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.portfolioService.getSkills().subscribe(data => {
      this.skillCategories = data;
      this.cdr.detectChanges();
    });
    this.portfolioService.getProfile().subscribe(p => {
      this.strengths = p?.strengths || [];
      this.cdr.detectChanges();
    });
  }
}
