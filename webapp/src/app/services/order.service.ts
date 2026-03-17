import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  http = inject(HttpClient);

  constructor() {}

  // ✅ Create order in your backend (Razorpay)
  createRazorpayOrder(amount: number) {
    return this.http.post<any>(
      environment.apiUrl + '/api/payment/create-order',
      { amount },
    );
  }

  // ✅ Place the order after payment
  placeOrder(orderData: any) {
    return this.http.post(
      environment.apiUrl + '/api/orders/place-order',
      orderData,
    );
  }
}
