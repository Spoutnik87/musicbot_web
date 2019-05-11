import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { CardComponent } from './components/card/card.component';
import { RegisterComponent } from './components/containers/register/register.component';
import { SigninComponent } from './components/containers/signin/signin.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { SigninFormComponent } from './components/forms/signin-form/signin-form.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ServerListComponent } from './components/server-list/server-list.component';
import { LetDirective } from './directives/let.directive';
import { guards } from './guards';
import { services } from './services';
import { effects } from './store/effects';
import { metaReducers, reducers, CustomSerializer } from './store/reducers';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoadingComponent,
    MessageComponent,
    MessagesComponent,
    RegisterComponent,
    RegisterFormComponent,
    SigninComponent,
    SigninFormComponent,
    HeaderComponent,
    CardComponent,
    ServerListComponent,
    LetDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [environment.domain],
        blacklistedRoutes: [environment.domain + '/login'],
      },
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    EffectsModule.forFeature(effects),
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }, ...services, ...guards],
  bootstrap: [AppComponent],
})
export class AppModule {}
