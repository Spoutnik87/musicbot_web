import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { delay, finalize, map, switchMap, tap } from 'rxjs/operators';
import { ConfigService, UserService } from 'src/app/services';

@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.css'],
})
export class ServerFormComponent {
  @Input()
  loading = false;

  @Output()
  submit = new EventEmitter<{
    name: string;
  }>();

  step = 1;
  choice: 'CREATE' | 'JOIN' = 'JOIN';

  server: {
    name: string;
  };

  serverJoinTokenLoading = false;

  serverJoinToken$ = of(null)
    .pipe(
      delay(0),
      switchMap(() => {
        this.serverJoinTokenLoading = true;
        return this.userService.getServerJoinToken();
      })
    )
    .pipe(
      map(token => {
        this.serverJoinTokenLoading = false;
        return token;
      })
    );

  constructor(private router: Router, private configService: ConfigService, private userService: UserService) {
    this.server = {
      name: '',
    };
  }

  onCancel() {
    if (this.step > 1) {
      this.step--;
    } else {
      this.router.navigateByUrl('');
    }
  }

  onSubmit() {
    if (this.step === 1) {
      this.step++;
    } else {
      this.submit.emit(this.server);
    }
  }

  onJoin() {
    this.router.navigateByUrl('');
  }
}
