import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { InicioAdminComponent } from './pages/inicio-admin/inicio-admin.component';
import { InicioUsuarioComponent } from './pages/inicio-usuario/inicio-usuario.component';
import { InicioGeneralComponent } from './pages/inicio-general/inicio-general.component';
import { canActivate } from './services/security/authguard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: 'inicio',
    component: InicioGeneralComponent,
    canActivate: [canActivate],
  },
  {
    path: 'inicio/user',
    component: InicioUsuarioComponent,
    canActivate: [canActivate],
  },
  {
    path: 'inicio/admin',
    component: InicioAdminComponent,
    canActivate: [canActivate],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
