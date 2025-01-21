import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalPrescriptions: number = 0;
  totalPharmacies: number = 0;
  totalDoctors: number = 0;
  totalPatients: number = 0;
  loading: boolean = true;
  user: any = {};
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.checkAuth();
    this.fetchDashboardData();
  }

  checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.warning('You need to login first!', 'Access Denied');
      this.router.navigate(['/']);
    }
  }

  fetchDashboardData() {
    this.userService.getUserProfile().subscribe({
      next: (res:any) => {
        this.totalPrescriptions = res.totalPrescriptions;
        this.totalPharmacies = res.totalPharmacies;
        this.totalDoctors = res.totalDoctors;
        this.totalPatients = res.totalPatients;
        this.loading = false;
      },
      error: (err:any) => {
        this.toastr.error('Failed to load dashboard data!', 'Error');
        this.loading = false;
      }
    });
  }

  fetchUserProfile(){
    this.userService.getUserProfile().subscribe({
      next: (data) => this.user = data,
      error: () => this.user = { name: 'Unknown User' }
    });
  }
}
