import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PrescriptionComponent } from './prescriptions/prescriptions.component';
import { PrescriptionCreateComponent } from './prescriptions/create-prescription/create-prescription.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Login route
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, 
  { path: 'prescription', component: PrescriptionComponent, canActivate: [AuthGuard] }, 
  { path: 'pharmacy', component: PharmacyComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirect to login by default
  { path: '**', redirectTo: 'login' },  // Redirect unknown routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
