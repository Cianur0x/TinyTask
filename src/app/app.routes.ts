import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioGeneralComponent } from './pages/inicio-general/inicio-general.component';
import { canActivate } from './services/security/authguard';
import { SignupComponent } from './pages/signup/signup.component';
import { AllTagsComponent } from './pages/all-tags/all-tags.component';
import { FriendsListComponent } from './pages/friends-list/friends-list.component';
import { NewsComponent } from './pages/news/news.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ManageRolesComponent } from './pages/manage-roles/manage-roles.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { StadisticsComponent } from './pages/stadistics/stadistics.component';
import { CreateNewsComponent } from './pages/create-news/create-news.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'inicio',
    component: InicioGeneralComponent,
    canActivate: [canActivate],
  },
  {
    path: 'tags',
    component: AllTagsComponent,
    canActivate: [canActivate],
  },
  {
    path: 'friends',
    component: FriendsListComponent,
    canActivate: [canActivate],
  },
  {
    path: 'news',
    component: NewsComponent,
    canActivate: [canActivate],
  },
  {
    path: 'create-news',
    component: CreateNewsComponent,
    canActivate: [canActivate],
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [canActivate],
  },
  {
    path: 'manage-roles',
    component: ManageRolesComponent,
    canActivate: [canActivate],
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    canActivate: [canActivate],
  },
  {
    path: 'stadistics',
    component: StadisticsComponent,
    canActivate: [canActivate],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
