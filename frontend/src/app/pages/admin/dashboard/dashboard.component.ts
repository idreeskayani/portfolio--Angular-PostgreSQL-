import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService, resolveUrl } from '../../../core/services/portfolio.service';
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
  newExp: any = { title: '', company: '', period: '', highlights: [] };
  newProject: any = { name: '', type: '', description: '', features: [], tech: [], category: 'mobile', sortOrder: 0 };
  newSkill: any = { category: '', icon: '', skills: [], sortOrder: 0 };
  newBlog: any = { title: '', slug: '', excerpt: '', content: '', tags: [], published: true };

  // Temp string inputs for array fields
  newExpHighlights: { [id: string]: string } = {};
  newProjectFeature = '';
  newProjectTech = '';
  newSkillItem = '';
  newBlogTag = '';
  newBlogTagEdit = '';

  uploadingThumbnail = false;
  uploadingProfilePic = false;
  uploadingResume = false;
  saving = false;
  toast = '';
  toastVisible = false;
  deletingId: { [key: string]: number | null } = { exp: null, project: null, skill: null, blog: null };
  showLogoutModal = false;

  constructor(
    private portfolioService: PortfolioService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.portfolioService.invalidateCache();
    this.loadTab('profile');
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    this.loadTab(tab);
  }

  loadTab(tab: string) {
    switch (tab) {
      case 'profile':
        this.portfolioService.getProfile().subscribe(d => {
          this.profile = { ...d, profilePic: resolveUrl(d.profilePic), resumeUrl: resolveUrl(d.resumeUrl) };
          this.cdr.detectChanges();
        });
        break;
      case 'experience':
        this.portfolioService.getExperience().subscribe(d => { this.experience = d; this.cdr.detectChanges(); });
        break;
      case 'projects':
        this.portfolioService.getProjects().subscribe(d => { this.projects = d; this.cdr.detectChanges(); });
        break;
      case 'skills':
        this.portfolioService.getSkills().subscribe(d => { this.skills = d; this.cdr.detectChanges(); });
        break;
      case 'blogs':
        this.portfolioService.getAdminBlogs().subscribe(d => { this.blogs = d; this.cdr.detectChanges(); });
        break;
    }
  }

  loadAll() {
    this.portfolioService.invalidateCache();
    this.loadTab(this.activeTab);
  }

  // ── Profile ──
  saveProfile() {
    this.saving = true;
    const stripBase = (url: string) => {
      if (!url) return url;
      try { return new URL(url).pathname; } catch { return url; }
    };
    const payload = {
      ...this.profile,
      profilePic: stripBase(this.profile.profilePic),
      resumeUrl: stripBase(this.profile.resumeUrl),
    };
    this.portfolioService.updateProfile(payload).subscribe({
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
    const sortOrder = this.experience.length + 1;
    this.portfolioService.createExperience({ ...this.newExp, sortOrder }).subscribe({
      next: () => { this.newExp = { title: '', company: '', period: '', highlights: [] }; this.newExpHighlights = {}; this.showToast('Experience added!'); this.loadAll(); },
      error: () => this.showToast('Error adding')
    });
  }

  deleteExp(id: number) {
    this.deletingId['exp'] = id;
    this.cdr.detectChanges();
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
    this.cdr.detectChanges();
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
    this.cdr.detectChanges();
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
    setTimeout(() => { this.toastVisible = true; this.cdr.detectChanges(); });
    setTimeout(() => { this.toastVisible = false; this.cdr.detectChanges(); }, 3000);
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
    this.cdr.detectChanges();
    this.portfolioService.deleteBlog(id).subscribe({ next: () => { this.deletingId['blog'] = null; this.loadAll(); } });
  }

  onThumbnailChange(event: Event, target: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploadingThumbnail = true;
    this.portfolioService.uploadImage(file).subscribe({
      next: res => { target.thumbnail = res.url; this.uploadingThumbnail = false; this.cdr.detectChanges(); },
      error: () => { this.showToast('Upload failed'); this.uploadingThumbnail = false; }
    });
  }

  onProfilePicChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploadingProfilePic = true;
    this.portfolioService.uploadImage(file).subscribe({
      next: res => {
        this.profile.profilePic = res.url; // store relative path, resolveUrl only for display
        this.uploadingProfilePic = false;
        this.cdr.detectChanges();
      },
      error: () => { this.showToast('Profile pic upload failed'); this.uploadingProfilePic = false; }
    });
  }

  onResumeChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploadingResume = true;
    this.portfolioService.uploadResume(file).subscribe({
      next: res => {
        this.profile.resumeUrl = res.url; // store relative path, resolveUrl only for display
        this.uploadingResume = false;
        this.cdr.detectChanges();
      },
      error: () => { this.showToast('Resume upload failed'); this.uploadingResume = false; }
    });
  }

  generateSlug(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  logout() { this.auth.logout(); this.router.navigate(['/']); }
  confirmLogout() { this.showLogoutModal = false; this.auth.logout(); this.router.navigate(['/']); }
}
