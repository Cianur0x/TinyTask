import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AllTagsComponent } from './pages/all-tags/all-tags.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { FriendsListComponent } from './pages/friends-list/friends-list.component';
import { HomeComponent } from './pages/home/home.component';
import { InicioGeneralComponent } from './pages/inicio-general/inicio-general.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { canActivate } from './services/security/authguard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'tasks',
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
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [canActivate],
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [canActivate],
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    canActivate: [canActivate],
    data: { roles: ['ROL_ADMIN'] },
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
