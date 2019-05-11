import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/containers/register/register.component';
import { SigninComponent } from './components/containers/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticatedGuard, NotAuthenticatedGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [NotAuthenticatedGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthenticatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
