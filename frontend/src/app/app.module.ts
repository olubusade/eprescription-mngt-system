import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PrescriptionCreateComponent } from './prescriptions/create-prescription/create-prescription.component';
import { PrescriptionComponent } from './prescriptions/prescriptions.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
const config: SocketIoConfig = { 
  url: 'http://localhost:5004', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthComponent,
    DashboardComponent,
    PrescriptionComponent,
    PrescriptionCreateComponent,
    PharmacyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Required for Toastr animations
    ToastrModule.forRoot({ // Global toastr configurations
      positionClass: 'toast-top-right',
      timeOut: 3000,  // Auto dismiss after 3s
      preventDuplicates: true
    }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
