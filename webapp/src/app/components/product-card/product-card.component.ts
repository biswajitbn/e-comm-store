import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Add Router for navigation
import { Product } from '../../types/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product: any;
  @Output() buy = new EventEmitter<any>();

  favorites = new Set<string>();
  cart = new Set<string>();

  constructor(private cdr: ChangeDetectorRef, private router: Router) {} // ✅ Inject Router

  onBuyNow(product: Product, quantity: number) {
    this.router.navigate(['/checkout', product._id],{
      state: {
        product,
        quantity
      }
    });
    // this.buy.emit(this.product);
  }

  getDiscount(price: number, discount: number): number {
    return Math.round((price * discount) / 100);
  }

  isFavorite(product: any): boolean {
    return this.favorites.has(product._id);
  }

  isInCart(product: any): boolean {
    return this.cart.has(product._id);
  }

  addToCart(product: any, event: Event): void {
    event.stopPropagation();

    if (this.isInCart(product)) {
      this.cart.delete(product._id);
      console.log('Removed from cart:', product);
    } else {
      this.cart.add(product._id);
      console.log('Added to cart:', product);
    }

    this.cart = new Set(this.cart); // Force new reference
    console.log('Cart active status:', this.isInCart(product));
    this.cdr.detectChanges(); // Trigger view update
  }

  toggleFavorite(product: any, event: MouseEvent): void {
    event.stopPropagation();

    if (this.isFavorite(product)) {
      this.favorites.delete(product._id);
      console.log('Removed from favorites:', product);
    } else {
      this.favorites.add(product._id);
      console.log('Added to favorites:', product);
    }

    this.favorites = new Set(this.favorites); // Force new reference
    console.log('Favorite active status:', this.isFavorite(product));
    this.cdr.detectChanges(); // Trigger view update
  }

  // ✅ View Details navigation
  viewDetails(product: any, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/product', product._id]);
  }
}
