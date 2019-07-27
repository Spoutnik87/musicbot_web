import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowCircleLeft, faArrowCircleRight, faCheck, faSave } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/services';
import { UsersService } from 'src/app/store/users/users.service';

@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
})
export class ServerFormComponent {
  faSave = faSave;
  faCheck = faCheck;
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowCircleRight = faArrowCircleRight;

  @Input()
  loading = false;

  @Output()
  submit = new EventEmitter<{
    name: string;
  }>();

  @Output()
  cancel = new EventEmitter();

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
        return this.usersService.getServerJoinToken();
      })
    )
    .pipe(
      map(token => {
        this.serverJoinTokenLoading = false;
        return token;
      })
    );

  constructor(private router: Router, public configService: ConfigService, private usersService: UsersService) {
    this.server = {
      name: '',
    };
  }

  onCancel() {
    if (this.step > 1) {
      this.step--;
    } else {
      this.cancel.emit();
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
