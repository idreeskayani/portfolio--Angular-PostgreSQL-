import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, RouterModule],
  template: `
    <section class="blog-list">
      <h1>Blog</h1>
      <p class="subtitle">Thoughts, tutorials, and insights</p>

      <div class="grid" *ngIf="blogs.length; else empty">
        <a class="card" *ngFor="let blog of blogs" [routerLink]="['/blog', blog.slug]">
          <img *ngIf="blog.thumbnail" [src]="'http://localhost:3000' + blog.thumbnail" [alt]="blog.title" />
          <div class="card-body">
            <div class="tags">
              <span class="tag" *ngFor="let tag of blog.tags">{{ tag }}</span>
            </div>
            <h2>{{ blog.title }}</h2>
            <p>{{ blog.excerpt }}</p>
            <span class="date">{{ blog.createdAt | date:'mediumDate' }}</span>
          </div>
        </a>
      </div>

      <ng-template #empty>
        <p class="empty">No blog posts yet.</p>
      </ng-template>

      <div class="pagination" *ngIf="lastPage > 1">
        <button (click)="loadPage(page - 1)" [disabled]="page === 1">← Prev</button>
        <span>{{ page }} / {{ lastPage }}</span>
        <button (click)="loadPage(page + 1)" [disabled]="page === lastPage">Next →</button>
      </div>
    </section>
  `,
  styles: [`
    .blog-list { max-width: 1100px; margin: 0 auto; padding: 4rem 1.5rem; }
    h1 { font-size: 2.5rem; color: #00d4ff; margin: 0; }
    .subtitle { color: #64748b; margin: 0.5rem 0 3rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
    .card { background: #0d1117; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; text-decoration: none; color: inherit; transition: border-color .2s; }
    .card:hover { border-color: #00d4ff; }
    .card img { width: 100%; height: 180px; object-fit: cover; }
    .card-body { padding: 1.25rem; }
    .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; }
    .tag { background: #1e293b; color: #00d4ff; font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 20px; }
    h2 { font-size: 1.1rem; color: #e2e8f0; margin: 0 0 0.5rem; }
    p { color: #94a3b8; font-size: 0.9rem; margin: 0 0 0.75rem; line-height: 1.5; }
    .date { color: #475569; font-size: 0.8rem; }
    .empty { color: #64748b; text-align: center; padding: 3rem; }
    .pagination { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: 3rem; }
    .pagination button { padding: 0.5rem 1.25rem; background: #1e293b; color: #e2e8f0; border: 1px solid #334155; border-radius: 8px; cursor: pointer; }
    .pagination button:disabled { opacity: 0.4; cursor: not-allowed; }
    .pagination span { color: #94a3b8; }
  `]
})
export class BlogListComponent implements OnInit {
  blogs: any[] = [];
  page = 1;
  lastPage = 1;

  constructor(private portfolioService: PortfolioService, private seo: SeoService) {}

  ngOnInit() {
    this.seo.set({ title: 'Blog – Muhammad Idrees Kayani', description: 'Thoughts, tutorials, and insights on mobile and web development.' });
    this.loadPage(1);
  }

  loadPage(p: number) {
    this.page = p;
    this.portfolioService.getBlogs(p, 6).subscribe(res => {
      this.blogs = res.data;
      this.lastPage = res.lastPage;
    });
  }
}
