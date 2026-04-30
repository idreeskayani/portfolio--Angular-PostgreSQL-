import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';

function decodeHtml(str: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

function decodeExp(exp: any): any {
  return {
    ...exp,
    title: decodeHtml(exp.title ?? ''),
    company: decodeHtml(exp.company ?? ''),
    period: decodeHtml(exp.period ?? ''),
    highlights: (exp.highlights ?? []).map((h: string) => decodeHtml(h))
  };
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  experience: any[] = [];

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.portfolioService.getExperience().subscribe(data => {
      this.experience = data.map(decodeExp);
      this.cdr.detectChanges();
      console.log("exp data", this.experience);
    });
  }
}
