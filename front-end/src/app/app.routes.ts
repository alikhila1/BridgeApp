import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'admin', component: AdminComponent }
];
