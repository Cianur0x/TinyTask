import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioGeneralComponent } from './pages/inicio-general/inicio-general.component';
import { canActivate } from './services/security/authguard';
import { SignupComponent } from './pages/signup/signup.component';
import { AllTagsComponent } from './pages/all-tags/all-tags.component';
import { FriendsListComponent } from './pages/friends-list/friends-list.component';

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
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
