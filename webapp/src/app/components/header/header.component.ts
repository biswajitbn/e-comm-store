import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Category } from '../../types/category';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  categoryList: Category[] = [];
  searchTerm: string = '';
  selectedCategoryId: string = '';
  searchResults: any[] = [];
  noResultsFound: boolean = false;
  showDropdown: boolean = false;
  recentSearches: string[] = [];

  private customerService = inject(CustomerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.fetchCategories();
    this.restoreSearchParams();
    this.loadRecentSearches();
  }

  private fetchCategories(): void {
    this.customerService.getCategories().subscribe((categories) => {
      this.categoryList = categories;
    });
  }

  private restoreSearchParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['search'] || '';
      this.selectedCategoryId = params['categoryId'] || '';
    });
  }

  onInputChange(): void {
    this.showDropdown = true;
    this.loadRecentSearches();

    if (this.searchTerm.trim()) {
      this.customerService.searchProducts(this.searchTerm).subscribe((results) => {
        console.log('Results:', results);
        this.searchResults = results.products;
        this.noResultsFound = results.products.length === 0;
      });
    } else {
      this.searchResults = [];
      this.noResultsFound = false;
    }
  }

  onSearch(): void {
    const trimmedTerm = this.searchTerm.trim();
    const queryParams: any = {};

    if (trimmedTerm) queryParams.search = trimmedTerm;
    if (this.selectedCategoryId) queryParams.categoryId = this.selectedCategoryId;

    this.updateRecentSearches(trimmedTerm);
    this.router.navigate(['/products'], { queryParams });
    this.showDropdown = false;
  }

  selectSuggestion(term: string): void {
    this.searchTerm = term;
    this.onSearch();
  }

  onFocus(): void {
    this.showDropdown = true;
    this.loadRecentSearches();
  }

  updateRecentSearches(term: string): void {
    if (!term) return; // Prevent empty strings

    console.log('Saving search term:', term);

    let history: string[] = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    history = [term, ...history.filter((item) => item !== term)].slice(0, 5);
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }

  loadRecentSearches(): void {
    this.recentSearches = JSON.parse(localStorage.getItem('searchHistory') || '[]') || [];
    console.log('Loaded recent searches:', this.recentSearches);
  }

  searchCategory(id: string): void {
    this.searchTerm = '';
    this.router.navigate(['/products'], {
      queryParams: { categoryId: id },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
