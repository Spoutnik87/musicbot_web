import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessagesQuery } from 'src/app/store/messages/messages.query';
import { MessagesService } from 'src/app/store/messages/messages.service';
import { UsersQuery } from 'src/app/store/users/users.query';
import { UsersService } from 'src/app/store/users/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit, OnDestroy {
  messages$ = this.messagesQuery.selectAll();
  authenticatedUserLoading$ = this.usersQuery.authenticatedUserLoading$;

  constructor(
    private messagesQuery: MessagesQuery,
    private messagesService: MessagesService,
    private usersService: UsersService,
    private usersQuery: UsersQuery
  ) {}

  ngOnInit() {
    this.messagesService.clearMessages();
  }

  ngOnDestroy() {
    this.messagesService.clearMessages();
  }

  onSubmit(event: { email: string; password: string }) {
    const { email, password } = event;
    this.usersService.signIn(email, password);
  }
}
