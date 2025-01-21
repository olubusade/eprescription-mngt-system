import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-prescription-create',
  templateUrl: './create-prescription.component.html',
  styleUrls: ['./create-prescription.component.scss']
})
export class PrescriptionCreateComponent {
  prescriptionDetails: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private socket: Socket, private router: Router) {}

  createPrescription() {
    if (this.prescriptionDetails.trim() === '') {
      this.errorMessage = 'Prescription details cannot be empty!';
      return;
    }

    const prescription = { details: this.prescriptionDetails };

    this.http.post('http://localhost:5000/api/prescriptions', prescription, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe({
      next: (res: any) => {
        // Emit real-time notification to notify pharmacists
        this.socket.emit('new-prescription', prescription);

        // Clear form and show success message
        this.prescriptionDetails = '';
        this.successMessage = 'Prescription created successfully!';
        this.errorMessage = '';
        
        // Optionally, redirect to the prescription list
        setTimeout(() => {
          this.router.navigate(['/prescriptions']);
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'An error occurred while creating the prescription.';
        this.successMessage = '';
      }
    });
  }
}
