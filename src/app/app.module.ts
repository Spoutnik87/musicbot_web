import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Ng5SliderModule } from 'ng5-slider';
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
import { EditCategoryComponent } from './components/containers/edit-category/edit-category.component';
import { EditContentComponent } from './components/containers/edit-content/edit-content.component';
import { HomeComponent } from './components/containers/home/home.component';
import { ManageServerComponent } from './components/containers/manage-server/manage-server.component';
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
import { CheckboxInputComponent } from './components/inputs/checkbox-input/checkbox-input.component';
import { ListInputComponent } from './components/inputs/list-input/list-input.component';
import { RadioInputComponent } from './components/inputs/radio-input/radio-input.component';
import { ToggleInputComponent } from './components/inputs/toggle-input/toggle-input.component';
import { ToggleMultiStateInputComponent } from './components/inputs/toggle-multi-state-input/toggle-multi-state-input.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ServerCardComponent } from './components/server-card/server-card.component';
import { ServerListComponent } from './components/server-list/server-list.component';
import { ServerStatusSliderComponent } from './components/server-status-slider/server-status-slider.component';
import { ServerStatusComponent } from './components/server-status/server-status.component';
import { LetDirective } from './directives/let.directive';
import { guards } from './guards';
import { ServerStatusHelper } from './helpers/server-status.helper';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DurationPipe } from './pipes/duration.pipe';
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
    ServerStatusComponent,
    ServerStatusSliderComponent,
    ManageServerComponent,
    EditCategoryComponent,
    EditContentComponent,
    ToggleInputComponent,
    CheckboxInputComponent,
    RadioInputComponent,
    ToggleMultiStateInputComponent,
    ListInputComponent,
    DurationPipe,
    LetDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    Ng5SliderModule,
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
    NgSelectModule,
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DurationPipe,
    ...services,
    ...guards,
    ServerStatusHelper,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
