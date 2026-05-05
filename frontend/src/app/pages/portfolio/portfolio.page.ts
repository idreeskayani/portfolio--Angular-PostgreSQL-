import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ProjectsComponent } from '../projects/projects.component';
import { SkillsComponent } from '../skills/skills.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-portfolio',
  imports: [
    RouterLink,
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent
  ],
  template: `
    <div class="cursor-glow" id="cursorGlow"></div>
    <app-home />
    <app-about />
    <app-experience />
    <app-projects />
    <app-skills />
    <app-contact />
    <a routerLink="/admin/login" class="admin-fab" title="Admin Panel">⚙️</a>
  `,
  styles: [`
    .cursor-glow {
      position: fixed;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: left 0.1s ease, top 0.1s ease;
    }
    .admin-fab {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      width: 44px;
      height: 44px;
      background: rgba(13, 17, 23, 0.9);
      border: 1px solid rgba(0, 212, 255, 0.25);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      text-decoration: none;
      z-index: 1000;
      opacity: 0.4;
      transition: opacity 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .admin-fab:hover {
      opacity: 1;
      border-color: rgba(0, 212, 255, 0.7);
      box-shadow: 0 0 12px rgba(0, 212, 255, 0.3);
    }
  `]
})
export class PortfolioPage implements OnInit {
  ngOnInit() {
    // Scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    setTimeout(() => {
      document.querySelectorAll('.anim').forEach(el => observer.observe(el));
    }, 100);

    // Cursor glow effect
    const glow = document.getElementById('cursorGlow');
    if (glow) {
      document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      });
    }
  }
}
