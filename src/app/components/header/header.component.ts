import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/store/app/app.service';
import { AuthQuery } from 'src/app/store/auth/auth.query';
import { AuthService } from 'src/app/store/auth/auth.service';
import { UsersService } from 'src/app/store/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleUp = faAngleDoubleUp;
  collapsed: boolean;
  routerSubscription: Subscription;
  authenticatedUser$ = this.authQuery.authenticatedUser$.pipe(
    map(() => ({
      isAuthenticated: this.authService.isAuthenticated(),
      isAdmin: this.authService.isAdmin(),
      isUser: this.authService.isUser(),
    }))
  );

  constructor(
    private router: Router,
    private authQuery: AuthQuery,
    private authService: AuthService,
    private usersService: UsersService,
    private appService: AppService
  ) {
    this.collapsed = true;
    this.routerSubscription = this.router.events.subscribe(() => {
      if (!this.collapsed) {
        this.collapsed = true;
      }
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  onDisconnect() {
    if (!this.collapsed) {
      this.collapsed = true;
    }
    this.usersService.disconnect();
    this.appService.clearStore();
    this.router.navigateByUrl('/signin');
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
