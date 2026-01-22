import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/api/reviews'; // Make sure this matches your backend route

  constructor(private http: HttpClient) {}

  // ✅ Get all reviews for a specific product (optional)
  getReviews(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?productId=${productId}`);
  }

  // ✅ Add a review for a product (used by your component)
  addReview(productId: string, review: {
    name: string;
    rating: number;
    comment: string;
  }): Observable<any> {
    const reviewData = { productId, ...review };
    return this.http.post(this.apiUrl, reviewData);
  }
}
