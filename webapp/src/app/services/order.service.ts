import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http = inject(HttpClient);

  constructor() { }

  // ✅ Create order in your backend (Razorpay)
  createRazorpayOrder(amount: number) {
    return this.http.post<any>('http://localhost:3000/api/payment/create-order', { amount });
  }

  // ✅ Place the order after payment
  placeOrder(orderData: any) {
    return this.http.post('http://localhost:3000/api/orders/place-order', orderData);
  }
}
