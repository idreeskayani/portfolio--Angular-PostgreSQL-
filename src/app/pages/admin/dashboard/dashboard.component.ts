import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  activeTab = 'profile';

  profile: any = {};
  experience: any[] = [];
  projects: any[] = [];
  skills: any[] = [];
  blogs: any[] = [];

  // Edit state
  editingExp: any = null;
  editingProject: any = null;
  editingSkill: any = null;
  editingBlog: any = null;

  // New item forms
  newExp: any = { title: '', company: '', period: '', highlights: [], sortOrder: 0 };
  newProject: any = { name: '', type: '', description: '', features: [], tech: [], category: 'mobile', sortOrder: 0 };
  newSkill: any = { category: '', icon: '', skills: [], sortOrder: 0 };
  newBlog: any = { title: '', slug: '', excerpt: '', content: '', tags: [], published: true };

  // Temp string inputs for array fields
  newExpHighlight = '';
  newProjectFeature = '';
  newProjectTech = '';
  newSkillItem = '';
  newBlogTag = '';
  newBlogTagEdit = '';

  uploadingThumbnail = false;
  saving = false;
  toast = '';
  toastVisible = false;
  deletingId: { [key: string]: number | null } = { exp: null, project: null, skill: null, blog: null };
  showLogoutModal = false;

  constructor(
    private portfolioService: PortfolioService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() { this.loadAll(); }

  loadAll() {
    this.portfolioService.invalidateCache();
    this.portfolioService.getProfile().subscribe(d => this.profile = { ...d });
    this.portfolioService.getExperience().subscribe(d => this.experience = d);
    this.portfolioService.getProjects().subscribe(d => this.projects = d);
    this.portfolioService.getSkills().subscribe(d => this.skills = d);
    this.portfolioService.getAdminBlogs().subscribe(d => this.blogs = d);
  }

  // ── Profile ──
  saveProfile() {
    this.saving = true;
    this.portfolioService.updateProfile(this.profile).subscribe({
      next: () => this.showToast('Profile saved!'),
      error: () => this.showToast('Error saving profile')
    });
  }

  addAboutParagraph() { this.profile.aboutParagraphs = [...(this.profile.aboutParagraphs || []), '']; }
  removeAboutParagraph(i: number) { this.profile.aboutParagraphs.splice(i, 1); }
  addInterest() { this.profile.interests = [...(this.profile.interests || []), '']; }
  removeInterest(i: number) { this.profile.interests.splice(i, 1); }
  addStrength() { this.profile.strengths = [...(this.profile.strengths || []), '']; }
  removeStrength(i: number) { this.profile.strengths.splice(i, 1); }
  trackByIndex(i: number) { return i; }

  // ── Experience ──
  saveExp(exp: any) {
    this.portfolioService.updateExperience(exp.id, exp).subscribe({
      next: () => { this.editingExp = null; this.showToast('Experience updated!'); this.loadAll(); },
      error: () => this.showToast('Error updating')
    });
  }

  addExp() {
    this.portfolioService.createExperience(this.newExp).subscribe({
      next: () => { this.newExp = { title: '', company: '', period: '', highlights: [], sortOrder: 0 }; this.newExpHighlight = ''; this.showToast('Experience added!'); this.loadAll(); },
      error: () => this.showToast('Error adding')
    });
  }

  deleteExp(id: number) {
    this.deletingId['exp'] = id;
    this.portfolioService.deleteExperience(id).subscribe({ next: () => { this.deletingId['exp'] = null; this.loadAll(); } });
  }

  addHighlight(arr: string[], input: string, clear: () => void) {
    if (input.trim()) { arr.push(input.trim()); clear(); }
  }

  // ── Projects ──
  saveProject(p: any) {
    this.portfolioService.updateProject(p.id, p).subscribe({
      next: () => { this.editingProject = null; this.showToast('Project updated!'); this.loadAll(); },
      error: () => this.showToast('Error updating')
    });
  }

  addProject() {
    this.portfolioService.createProject(this.newProject).subscribe({
      next: () => { this.newProject = { name: '', type: '', description: '', features: [], tech: [], category: 'mobile', sortOrder: 0 }; this.newProjectFeature = ''; this.newProjectTech = ''; this.showToast('Project added!'); this.loadAll(); },
      error: () => this.showToast('Error adding')
    });
  }

  deleteProject(id: number) {
    this.deletingId['project'] = id;
    this.portfolioService.deleteProject(id).subscribe({ next: () => { this.deletingId['project'] = null; this.loadAll(); } });
  }

  // ── Skills ──
  saveSkill(s: any) {
    this.portfolioService.updateSkill(s.id, s).subscribe({
      next: () => { this.editingSkill = null; this.showToast('Skill updated!'); this.loadAll(); },
      error: () => this.showToast('Error updating')
    });
  }

  addSkill() {
    this.portfolioService.createSkill(this.newSkill).subscribe({
      next: () => { this.newSkill = { category: '', icon: '', skills: [], sortOrder: 0 }; this.newSkillItem = ''; this.showToast('Skill category added!'); this.loadAll(); },
      error: () => this.showToast('Error adding')
    });
  }

  deleteSkill(id: number) {
    this.deletingId['skill'] = id;
    this.portfolioService.deleteSkill(id).subscribe({ next: () => { this.deletingId['skill'] = null; this.loadAll(); } });
  }

  addToArray(arr: string[], value: string): string {
    if (value.trim()) arr.push(value.trim());
    return '';
  }

  removeFromArray(arr: string[], i: number) { arr.splice(i, 1); }

  showToast(msg: string) {
    this.saving = false;
    this.toastVisible = false;
    this.toast = msg;
    setTimeout(() => { this.toastVisible = true; });
    setTimeout(() => { this.toastVisible = false; }, 3000);
  }

  // ── Blogs ──
  saveBlog(b: any) {
    this.portfolioService.updateBlog(b.id, b).subscribe({
      next: () => { this.editingBlog = null; this.showToast('Blog updated!'); this.loadAll(); },
      error: () => this.showToast('Error updating blog')
    });
  }

  addBlog() {
    this.portfolioService.createBlog(this.newBlog).subscribe({
      next: () => { this.newBlog = { title: '', slug: '', excerpt: '', content: '', tags: [], published: true }; this.newBlogTag = ''; this.showToast('Blog created!'); this.loadAll(); },
      error: () => this.showToast('Error creating blog')
    });
  }

  deleteBlog(id: number) {
    this.deletingId['blog'] = id;
    this.portfolioService.deleteBlog(id).subscribe({ next: () => { this.deletingId['blog'] = null; this.loadAll(); } });
  }

  onThumbnailChange(event: Event, target: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploadingThumbnail = true;
    this.portfolioService.uploadImage(file).subscribe({
      next: res => { target.thumbnail = res.url; this.uploadingThumbnail = false; },
      error: () => { this.showToast('Upload failed'); this.uploadingThumbnail = false; }
    });
  }

  generateSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  logout() { this.auth.logout(); this.router.navigate(['/']); }
  confirmLogout() { this.showLogoutModal = false; this.auth.logout(); this.router.navigate(['/']); }
}
