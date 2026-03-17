import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = environment.apiUrl + '/api/reviews';

  constructor(private http: HttpClient) {}

  // Get all reviews for a specific product
  getReviews(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?productId=${productId}`);
  }

  // Add a review for a product
  addReview(
    productId: string,
    review: {
      name: string;
      rating: number;
      comment: string;
    },
  ): Observable<any> {
    const reviewData = {
      productId,
      ...review,
    };

    return this.http.post(this.apiUrl, reviewData);
  }
}
