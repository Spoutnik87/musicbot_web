import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../store/auth/auth.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isUser = this.authService.isAuthenticated() && (this.authService.isAdmin() || this.authService.isUser());
    if (!isUser) {
      this.router.navigate(['/']);
    }
    return isUser;
  }
}
