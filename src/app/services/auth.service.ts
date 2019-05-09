import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../enums/Role';
import { UserModel } from '../models/user.model';

export class AuthService {
  private authenticatedUser: BehaviorSubject<{
    email: string;
    token: string;
    role: Role;
  }>;
  authenticatedUser$: Observable<{
    email: string;
    token: string;
    role: Role;
  }>;
  isAuthenticated$: Observable<boolean>;

  constructor() {
    let user: {
      email: string;
      token: string;
      role: Role;
    };
    if (localStorage.length !== 0) {
      user = {
        email: this.getEmail(),
        token: this.getToken(),
        role: this.getRole(),
      };
    }
    this.authenticatedUser = new BehaviorSubject(user);
    this.authenticatedUser$ = this.authenticatedUser.asObservable();
    this.isAuthenticated$ = this.authenticatedUser$.pipe(map(u => u != null));
  }

  signIn(user: UserModel): void {
    localStorage.setItem('email', user.email);
    localStorage.setItem('token', user.token);
    localStorage.setItem('role', user.role.name);
    this.authenticatedUser.next({
      email: user.email,
      token: user.token,
      role: user.role.name as Role,
    });
  }

  disconnect(): void {
    localStorage.clear();
    this.authenticatedUser.next(undefined);
  }

  getEmail(): string {
    return localStorage.getItem('email');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getRole(): Role {
    return localStorage.getItem('role') as Role;
  }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  isAdmin(): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }
    if (this.getRole() !== Role.ADMIN) {
      return false;
    }
    return true;
  }

  isUser(): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }
    if (this.getRole() !== Role.USER) {
      return false;
    }
    return true;
  }
}
