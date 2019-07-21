import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LetDirective } from './directives/let.directive';
import { ConfigService } from './services';
import { AuthService } from './store/auth/auth.service';
import { MessagesService } from './store/messages/messages.service';
import { UsersService } from './store/users/users.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, HttpClientTestingModule],
      declarations: [AppComponent, HeaderComponent, LoadingComponent, LetDirective, FooterComponent],
      providers: [AuthService, UsersService, ConfigService, MessagesService],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
