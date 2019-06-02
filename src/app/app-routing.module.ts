import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/containers/about/about.component';
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
  {
    path: 'create-server',
    component: CreateServerComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'server/:id',
    component: ServerComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'create-content/:id',
    component: CreateContentComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'create-category/:id',
    component: CreateCategoryComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'create-group/:id',
    component: CreateGroupComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'manage-server/:id',
    component: ManageServerComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'edit-content/:id',
    component: EditContentComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'edit-category/:id',
    component: EditCategoryComponent,
    canActivate: [AuthenticatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
