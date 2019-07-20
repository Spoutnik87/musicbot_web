import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesQuery } from 'src/app/store/messages/messages.query';
import { MessagesService } from 'src/app/store/messages/messages.service';
import { UsersService } from 'src/app/store/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  messages$ = this.messagesQuery.selectAll();
  loading = false;

  constructor(
    private usersService: UsersService,
    private messagesService: MessagesService,
    private messagesQuery: MessagesQuery,
    private router: Router
  ) {}

  ngOnInit() {
    this.messagesService.clearMessages();
  }

  ngOnDestroy() {
    this.messagesService.clearMessages();
  }

  onSubmit(event: { email: string; nickname: string; password: string; confirmPassword: string; firstname: string; lastname: string }) {
    const { email, nickname, password, confirmPassword, firstname, lastname } = event;

    if (password === confirmPassword) {
      this.loading = true;
      this.usersService.create(email, nickname, password, firstname, lastname).subscribe(
        () => {
          this.loading = false;
          this.router.navigateByUrl('/signin');
        },
        () => {
          this.loading = false;
          this.messagesService.sendErrorMessage("Une erreur est survenue lors de l'inscription.");
        }
      );
    } else {
      this.messagesService.sendErrorMessage('Le mot de passe est invalide.');
    }
  }
}
