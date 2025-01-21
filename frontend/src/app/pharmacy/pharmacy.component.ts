import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {
  orders:any = [];

  constructor(private http: HttpClient,  private toastr: ToastrService,) {}

  ngOnInit(): void {
    this.toastr.warning('Stock running low!', 'Inventory Alert');

    this.getOrders();
  }

  getOrders(): void {
    this.http.get('http://localhost:5000/api/pharmacy/orders', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe((res: any) => {
      this.orders = res.data;
    });
  }

  processOrder(orderId: string): void {
    // API call to process order
    this.http.post(`http://localhost:5000/api/pharmacy/orders/${orderId}/process`, {}, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).subscribe(() => {
      this.toastr.success('Order Processed!');
      this.getOrders();
    });
  }
}
