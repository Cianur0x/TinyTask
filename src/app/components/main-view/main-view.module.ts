import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesComponent } from './features/features.component';
import { FooterComponent } from './footer/footer.component';
import { GeneralNavbarComponent } from './general-navbar/general-navbar.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OpinionsComponent } from './opinions/opinions.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OpinionsComponent,
    FeaturesComponent,
    FooterComponent,
    GeneralNavbarComponent,
    NavbarComponent,
    NavbarAdminComponent,
    NavbarUserComponent,
  ],
  exports: [
    FeaturesComponent,
    OpinionsComponent,
    FooterComponent,
    GeneralNavbarComponent,
    NavbarComponent,
    NavbarAdminComponent,
    NavbarUserComponent,
  ],
})
export class MainViewModule {}
