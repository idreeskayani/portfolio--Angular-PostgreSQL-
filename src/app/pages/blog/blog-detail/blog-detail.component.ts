import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule, RouterModule],
  template: `
    <article class="blog-detail" *ngIf="blog; else loading">
      <a routerLink="/blog" class="back">← Back to Blog</a>
      <img *ngIf="blog.thumbnail" [src]="'http://localhost:3000' + blog.thumbnail" [alt]="blog.title" class="hero" />
      <div class="tags">
        <span class="tag" *ngFor="let tag of blog.tags">{{ tag }}</span>
      </div>
      <h1>{{ blog.title }}</h1>
      <p class="meta">{{ blog.createdAt | date:'longDate' }}</p>
      <div class="content" [innerHTML]="safeContent"></div>
    </article>
    <ng-template #loading>
      <div class="loading">Loading...</div>
    </ng-template>
  `,
  styles: [`
    .blog-detail { max-width: 780px; margin: 0 auto; padding: 4rem 1.5rem; }
    .back { color: #00d4ff; text-decoration: none; font-size: 0.9rem; }
    .hero { width: 100%; max-height: 400px; object-fit: cover; border-radius: 12px; margin: 1.5rem 0; }
    .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
    .tag { background: #1e293b; color: #00d4ff; font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 20px; }
    h1 { font-size: 2rem; color: #e2e8f0; margin: 0 0 0.5rem; }
    .meta { color: #475569; font-size: 0.85rem; margin-bottom: 2rem; }
    .content { color: #cbd5e1; line-height: 1.8; font-size: 1rem; }
    .content :global(h2) { color: #00d4ff; margin-top: 2rem; }
    .content :global(pre) { background: #0a0a0a; padding: 1rem; border-radius: 8px; overflow-x: auto; }
    .content :global(code) { background: #1e293b; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.9em; }
    .content :global(a) { color: #00d4ff; }
    .loading { text-align: center; padding: 4rem; color: #64748b; }
  `]
})
export class BlogDetailComponent implements OnInit {
  blog: any = null;
  safeContent: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private seo: SeoService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.portfolioService.getBlogBySlug(slug).subscribe(blog => {
      this.blog = blog;
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(blog.content);
      this.seo.set({
        title: `${blog.title} – Muhammad Idrees Kayani`,
        description: blog.excerpt,
        image: blog.thumbnail ? `http://localhost:3000${blog.thumbnail}` : undefined,
        url: `https://idreeskayani.dev/blog/${blog.slug}`,
      });
    });
  }
}
