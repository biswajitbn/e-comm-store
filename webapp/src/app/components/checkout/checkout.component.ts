import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';

declare var Razorpay: any; // 👈 Declare Razorpay global

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  product: any = null;
  quantity: number = 1;
  totalPrice: number = 0;

  name: string = '';
  address: string = '';
  phone: string = '';

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          this.product = data;
          this.calculateTotal();
        },
        error: (err) => {
          console.error('Failed to load product:', err);
          alert('Product not found or error occurred!');
        },
      });
    } else {
      alert('No product selected. Redirecting...');
      this.router.navigate(['/products']);
    }
  }

  calculateTotal(): void {
    if (this.product) {
      const discountPrice = this.product.price * (1 - this.product.discount / 100);
      this.totalPrice = Math.floor(discountPrice * this.quantity);
    }
  }

  increaseQuantity(): void {
    this.quantity++;
    this.calculateTotal();
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotal();
    }
  }

  onPlaceOrder(): void {
    if (!this.name || !this.address || !this.phone) {
      alert('Please fill in all delivery details.');
      return;
    }

    const amountInPaise = this.totalPrice * 100;

    this.orderService.createRazorpayOrder(amountInPaise).subscribe({
      next: (order) => {
        const options = {
          key: 'rzp_test_xcERITTpSfdDND', // ✅ Replace with your Razorpay key
          amount: order.amount,
          currency: 'INR',
          name: 'My E-Commerce Store',
          description: 'Payment for Order',
          image: '', // Optional logo URL
          order_id: order.id,
          handler: (response: any) => {
            this.handlePaymentSuccess(response);
          },
          prefill: {
            name: this.name,
            contact: this.phone,
            email: 'customer@example.com', // Optional
          },
          notes: {
            address: this.address,
          },
          theme: {
            color: '#0070f3',
          },
        };

        const rzp = new Razorpay(options);
        rzp.open();
      },
      error: (err) => {
        console.error('Failed to create Razorpay order', err);
        alert('Payment initiation failed.');
      }
    });
  }

  handlePaymentSuccess(response: any): void {
    const orderPayload = {
      products: [
        {
          _id: this.product._id,
          name: this.product.name,
          price: this.product.price,
          discount: this.product.discount,
          images: this.product.images,
          quantity: this.quantity,
        },
      ],
      total: this.totalPrice,
      deliveryDetails: {
        name: this.name,
        address: this.address,
        phone: this.phone,
      },
      paymentId: response.razorpay_payment_id,
    };

    this.orderService.placeOrder(orderPayload).subscribe({
      next: () => {
        alert('Payment successful and order placed!');
        this.router.navigate(['/my-orders']);
      },
      error: (err) => {
        alert('Order failed after payment.');
        console.error(err);
      }
    });
  }
}
