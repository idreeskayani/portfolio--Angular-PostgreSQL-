import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/contact.service';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  data: any = null;

  form = { name: '', email: '', message: '' };
  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  constructor(
    private contactService: ContactService,
    private portfolioService: PortfolioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.portfolioService.getProfile().subscribe(p => this.data = p);
  }

  onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.status = 'loading';
    this.contactService.sendMessage(this.form).subscribe({
      next: () => {
        this.status = 'success';
        this.form = { name: '', email: '', message: '' };
        this.cdr.detectChanges();
        setTimeout(() => { this.status = 'idle'; this.cdr.detectChanges(); }, 4000);
      },
      error: () => {
        this.status = 'error';
        this.cdr.detectChanges();
        setTimeout(() => { this.status = 'idle'; this.cdr.detectChanges(); }, 4000);
      }
    });
  }
}
