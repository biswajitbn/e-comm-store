import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../types/product';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private customerService = inject(CustomerService);
  private route = inject(ActivatedRoute);

  products: Product[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];

  // Filters
  searchTerm = '';
  categoryId = '';
  brandId = '';
  sortBy = 'name';
  sortOrder = 'asc';
  page = 1;
  pageSize = 1000;

  ngOnInit(): void {
    this.customerService.getCategories().subscribe(c => this.categories = c);
    this.customerService.getBrands().subscribe(b => this.brands = b);

    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.categoryId = params['categoryId'] || '';
      this.getFilteredBrands();
      this.getProducts();
    });
  }

  getProducts(): void {
    console.log("Calling getProducts with brandId:", this.brandId); // ✅ Add this
    this.customerService.getProducts(
      this.searchTerm,
      this.categoryId,
      this.sortBy,
      this.sortOrder,
      this.brandId,
      this.page,
      this.pageSize
    ).subscribe(res => {
      console.log('Products received:', res.products); // <-- Add this
      this.products = res.products;
    });
  }

  onCategoryChange(): void {
    this.brandId = '';
    this.getFilteredBrands();
    this.getProducts();
  }

  getFilteredBrands(): void {
    console.log('Fetching brands for category:', this.categoryId);
    if (this.categoryId) {
      this.customerService.getBrandsByCategory(this.categoryId).subscribe(b => {
        console.log('Filtered brands:', b);
        this.brands = b;
      });
    } else {
      this.customerService.getBrands().subscribe(b => {
        console.log('All brands:', b);
        this.brands = b
    });
    }
  }

  handleBuy(product: Product): void {
    console.log('Purchased:', product);
  }
}
