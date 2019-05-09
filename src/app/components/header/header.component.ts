import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services';
import { ClearStore, DisconnectUser, IAppState } from 'src/app/store';

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
  authenticatedUser$ = this.authService.authenticatedUser$.pipe(
    map(() => ({
      isAuthenticated: this.authService.isAuthenticated(),
      isAdmin: this.authService.isAdmin(),
      isUser: this.authService.isUser(),
    }))
  );

  constructor(private router: Router, private authService: AuthService, private store: Store<IAppState>) {
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
    this.authService.disconnect();
    this.store.dispatch(new DisconnectUser());
    this.store.dispatch(new ClearStore());
    this.router.navigateByUrl('');
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
