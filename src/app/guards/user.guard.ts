import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isStudent = this.authService.isAuthenticated() && (this.authService.isAdmin() || this.authService.isUser());
    if (!isStudent) {
      this.router.navigate(['/']);
    }
    return isStudent;
  }
}
