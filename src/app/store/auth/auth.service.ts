import { Injectable } from '@angular/core';
import { Role } from '../../enums/Role';
import { UserModel } from '../../models/user.model';
import { AuthStore } from './auth.store';

@Injectable()
export class AuthService {
  constructor(private authStore: AuthStore) {
    let user: {
      id: string;
      email: string;
      token: string;
      role: Role;
    };
    if (localStorage.length !== 0) {
      user = {
        id: this.getId(),
        email: this.getEmail(),
        token: this.getToken(),
        role: this.getRole(),
      };
    }
  }

  signIn(user: UserModel): void {
    localStorage.setItem('id', user.id);
    localStorage.setItem('email', user.email);
    localStorage.setItem('token', user.token);
    localStorage.setItem('role', user.role.name);
    this.authStore.update({
      id: user.id,
      email: user.email,
      token: user.token,
      role: user.role.name as Role,
    });
  }

  disconnect(): void {
    localStorage.clear();
    this.authStore.reset();
  }

  public getId(): string {
    return localStorage.getItem('id');
  }

  private getEmail(): string {
    return localStorage.getItem('email');
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }

  private getRole(): Role {
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
