import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { CardComponent } from './components/card/card.component';
import { AboutComponent } from './components/containers/about/about.component';
import { ContentCardComponent } from './components/containers/content-card/content-card.component';
import { CreateCategoryComponent } from './components/containers/create-category/create-category.component';
import { CreateContentComponent } from './components/containers/create-content/create-content.component';
import { CreateGroupComponent } from './components/containers/create-group/create-group.component';
import { CreateServerComponent } from './components/containers/create-server/create-server.component';
import { HomeComponent } from './components/containers/home/home.component';
import { RegisterComponent } from './components/containers/register/register.component';
import { ServerComponent } from './components/containers/server/server.component';
import { SigninComponent } from './components/containers/signin/signin.component';
import { ContentListComponent } from './components/content-list/content-list.component';
import { CategoryFormComponent } from './components/forms/category-form/category-form.component';
import { ContentFormComponent } from './components/forms/content-form/content-form.component';
import { GroupFormComponent } from './components/forms/group-form/group-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { ServerFormComponent } from './components/forms/server-form/server-form.component';
import { SigninFormComponent } from './components/forms/signin-form/signin-form.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ServerCardComponent } from './components/server-card/server-card.component';
import { ServerListComponent } from './components/server-list/server-list.component';
import { LetDirective } from './directives/let.directive';
import { guards } from './guards';
import { AuthInterceptor } from './interceptors/auth.interceptor';
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
    ServerCardComponent,
    ServerFormComponent,
    CreateServerComponent,
    ServerComponent,
    CreateContentComponent,
    ContentFormComponent,
    ContentCardComponent,
    ContentListComponent,
    CategoryFormComponent,
    CreateCategoryComponent,
    GroupFormComponent,
    CreateGroupComponent,
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
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ...services,
    ...guards,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
