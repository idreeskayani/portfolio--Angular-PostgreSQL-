import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PORTFOLIO } from '../../core/data/portfolio.data';
import { ContactService } from '../../core/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  data = PORTFOLIO;

  form = { name: '', email: '', message: '' };
  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  constructor(private contactService: ContactService) {}

  onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.status = 'loading';
    this.contactService.sendMessage(this.form).subscribe({
      next: () => {
        this.status = 'success';
        this.form = { name: '', email: '', message: '' };
      },
      error: () => (this.status = 'error')
    });
  }
}
