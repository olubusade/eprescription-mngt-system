import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  fetchDashboardData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/dashboard`);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }
}
