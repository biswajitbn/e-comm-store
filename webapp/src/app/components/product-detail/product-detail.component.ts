import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ReviewService } from '../../services/review.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  loading = true;
  error: string = '';
  showFullDesc = false;
  quantity: number = 1;
  selectedImage: string | null = null;
  selectedRating: string = 'all';
  filteredReviews: any[] = [];

  newReview = {
    name: '',
    rating: '',
    comment: ''
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchProduct(id);
    } else {
      this.error = 'Invalid product ID.';
      this.loading = false;
    }
  }

  // ✅ Fetch product and sort reviews by newest
  fetchProduct(id: string): void {
    this.loading = true;

    this.productService.getProductById(id).subscribe({
      next: (res: any) => {
        this.product = res;

        this.reviewService.getReviews(id).subscribe({
          next: (reviews) => {
            const sorted = reviews.sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            this.product.reviews = sorted;
            this.filteredReviews = [...sorted];
            this.loading = false;
          },
          error: (err) => {
            console.error('Failed to fetch reviews:', err);
            this.product.reviews = [];
            this.filteredReviews = [];
            this.loading = false;
          }
        });
      },
      error: (err: any) => {
        console.error('Failed to fetch product:', err);
        this.error = 'Product not found.';
        this.loading = false;
      }
    });
  }

  getDiscountedPrice(price: number, discount: number): number {
    return discount ? Math.round(price - (price * discount) / 100) : price;
  }

  increaseQty(): void {
    this.quantity++;
  }

  decreaseQty(): void {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(product: any, quantity: number): void {
    console.log('Add to cart:', product, quantity);
  }

  addToWishlist(product: any): void {
    console.log('Add to wishlist:', product);
  }

  filterReviews(): void {
    if (this.selectedRating === 'all') {
      this.filteredReviews = [...(this.product.reviews || [])];
    } else {
      const rating = parseInt(this.selectedRating);
      this.filteredReviews = (this.product.reviews || []).filter(
        (r: any) => r.rating === rating
      );
    }
  }

  // ✅ Submit review and re-fetch sorted
  submitReview(): void {
    const { name, rating, comment } = this.newReview;
    if (!name.trim() || !rating || !comment.trim()) return;

    const review = {
      name: name.trim(),
      rating: parseFloat(rating),
      comment: comment.trim()
    };

    this.reviewService.addReview(this.product._id, review).subscribe({
      next: () => {
        this.reviewService.getReviews(this.product._id).subscribe({
          next: (reviews) => {
            const sorted = reviews.sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            this.product.reviews = sorted;
            this.filterReviews(); // Maintain selected filter
          },
          error: (err) => {
            console.error('Failed to fetch updated reviews:', err);
          }
        });

        this.newReview = { name: '', rating: '', comment: '' };
      },
      error: (err: any) => {
        console.error('Failed to submit review:', err);
        alert('Something went wrong. Try again.');
      }
    });
  }
}
