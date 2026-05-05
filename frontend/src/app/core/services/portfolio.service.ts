import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
const API = environment.apiUrl;
export const BASE_URL = environment.baseUrl;

export function resolveUrl(path: string): string {
  if (!path) return '';
  return path.startsWith('/uploads/') ? BASE_URL + path : path;
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private cache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) {}

  private cached<T>(key: string, req: Observable<T>): Observable<T> {
    if (!this.cache.has(key)) {
      this.cache.set(key, req.pipe(shareReplay(1)));
    }
    return this.cache.get(key)!;
  }

  getProfile(): Observable<any> { return this.cached('profile', this.http.get(`${API}/profile`)); }
  updateProfile(data: any): Observable<any> { this.cache.delete('profile'); return this.http.post(`${API}/profile`, data); }

  getExperience(): Observable<any[]> { return this.cached('experience', this.http.get<any[]>(`${API}/experience`)); }
  createExperience(data: any): Observable<any> { this.cache.delete('experience'); return this.http.post(`${API}/experience`, data); }
  updateExperience(id: number, data: any): Observable<any> { this.cache.delete('experience'); return this.http.put(`${API}/experience/${id}`, data); }
  deleteExperience(id: number): Observable<any> { this.cache.delete('experience'); return this.http.delete(`${API}/experience/${id}`); }

  getProjects(): Observable<any[]> { return this.cached('projects', this.http.get<any[]>(`${API}/projects`)); }
  createProject(data: any): Observable<any> { this.cache.delete('projects'); return this.http.post(`${API}/projects`, data); }
  updateProject(id: number, data: any): Observable<any> { this.cache.delete('projects'); return this.http.put(`${API}/projects/${id}`, data); }
  deleteProject(id: number): Observable<any> { this.cache.delete('projects'); return this.http.delete(`${API}/projects/${id}`); }

  getSkills(): Observable<any[]> { return this.cached('skills', this.http.get<any[]>(`${API}/skills`)); }
  createSkill(data: any): Observable<any> { this.cache.delete('skills'); return this.http.post(`${API}/skills`, data); }
  updateSkill(id: number, data: any): Observable<any> { this.cache.delete('skills'); return this.http.put(`${API}/skills/${id}`, data); }
  deleteSkill(id: number): Observable<any> { this.cache.delete('skills'); return this.http.delete(`${API}/skills/${id}`); }

  invalidateCache() { this.cache.clear(); }

  // ── Blogs ──
  getBlogs(page = 1, limit = 6): Observable<any> {
    return this.http.get(`${API}/blogs?page=${page}&limit=${limit}`);
  }
  getBlogBySlug(slug: string): Observable<any> { return this.http.get(`${API}/blogs/${slug}`); }
  getAdminBlogs(): Observable<any[]> { return this.http.get<any[]>(`${API}/blogs/admin/all`); }
  createBlog(data: any): Observable<any> { return this.http.post(`${API}/blogs`, data); }
  updateBlog(id: number, data: any): Observable<any> { return this.http.put(`${API}/blogs/${id}`, data); }
  deleteBlog(id: number): Observable<any> { return this.http.delete(`${API}/blogs/${id}`); }

  // ── Upload ──
  uploadImage(file: File): Observable<{ url: string }> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<{ url: string }>(`${API}/upload/image`, form);
  }

  uploadResume(file: File): Observable<{ url: string }> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<{ url: string }>(`${API}/upload/resume`, form);
  }
}
