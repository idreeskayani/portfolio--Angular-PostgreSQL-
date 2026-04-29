import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled">
      <span class="logo">
        <span class="logo-bracket">&lt;</span>IK<span class="logo-bracket">/&gt;</span>
      </span>
      <ul class="nav-links">
        <li><a href="#home"       class="nav-link">Home</a></li>
        <li><a href="#about"      class="nav-link">About</a></li>
        <li><a href="#experience" class="nav-link">Experience</a></li>
        <li><a href="#projects"   class="nav-link">Projects</a></li>
        <li><a href="#skills"     class="nav-link">Skills</a></li>
        <li><a href="#contact"    class="nav-link">Contact</a></li>
      </ul>
    </nav>
    <!-- Spacer so content starts below the fixed navbar -->
    <div class="navbar-spacer"></div>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 3rem;
      height: 64px;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      border-bottom: 1px solid rgba(0, 212, 255, 0.1);
      transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }

    .navbar.scrolled {
      background: rgba(0, 0, 0, 0.97);
      border-bottom-color: rgba(0, 212, 255, 0.3);
      box-shadow: 0 4px 30px rgba(0, 212, 255, 0.08);
    }

    /* Spacer matches navbar height */
    .navbar-spacer {
      height: 64px;
      flex-shrink: 0;
    }

    .logo {
      color: #fff;
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: 2px;
      display: flex;
      align-items: center;
      gap: 0.2rem;
      animation: slideInLeft 0.6s ease;
      text-decoration: none;
    }

    .logo-bracket {
      color: #00d4ff;
      animation: pulse 2.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.4; }
    }

    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .nav-links {
      list-style: none;
      display: flex;
      gap: 2rem;
      animation: slideInRight 0.6s ease;
    }

    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(20px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .nav-link {
      color: #94a3b8;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: color 0.25s ease;
      position: relative;
      padding-bottom: 4px;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #00d4ff, #0099ff);
      border-radius: 2px;
      transition: width 0.3s ease;
    }

    .nav-link:hover {
      color: #00d4ff;
    }

    .nav-link:hover::after {
      width: 100%;
    }

    @media (max-width: 768px) {
      .navbar { padding: 0 1.5rem; }
      .nav-links { gap: 1.2rem; }
      .nav-link { font-size: 0.82rem; }
    }

    @media (max-width: 480px) {
      .nav-links { display: none; }
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 20;
  }
}
