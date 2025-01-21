import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionComponent implements OnInit {
  prescriptions:any = [];
  newPrescription: string = '';

  constructor(private socket: Socket, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getPrescriptions();

    // Listen for real-time updates from Notification Service
    this.socket.on('notify-pharmacist', (data:any) => {
      console.log('New Prescription for Pharmacist: ', data);
      alert('New Prescription Available!');
    });
  }

  getPrescriptions(): void {
    this.http.get('http://localhost:5000/api/prescriptions', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe((res: any) => {
      this.prescriptions = res.data;
    });
  }

  createPrescription(): void {
    const prescription = { details: this.newPrescription };
    this.http.post('http://localhost:5000/api/prescriptions', prescription, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(() => {
      this.socket.emit('new-prescription', prescription);
      this.getPrescriptions();
      this.newPrescription = '';
    });
  }
}
