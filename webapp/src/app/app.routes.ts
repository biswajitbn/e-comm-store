import { Routes } from '@angular/router';

// Core guards (functional guards)
import { authGuard } from './core/auth-guard';
import { adminGuard } from './core/admin-guard';

// Public
import { HomeComponent } from '../app/components/home/home.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';

// Products
import { ProductListComponent } from '../app/components/product-list/product-list.component';
import { ProductDetailComponent } from '../app/components/product-detail/product-detail.component';

// User
import { CheckoutComponent } from '../app/components/checkout/checkout.component';
import { CustomerProfileComponent } from '../app/components/customer-profile/customer-profile.component';

// Admin (manage folder components)
import { AdminDashboardComponent } from '../app/components/manage/admin-dashboard/admin-dashboard.component';
import { ProductsComponent } from '../app/components/manage/products/products.component';
import { ProductFormComponent } from '../app/components/manage/product-form/product-form.component';
import { CategoriesComponent } from '../app/components/manage/categories/categories.component';
import { CategoryFormComponent } from '../app/components/manage/category-form/category-form.component';
import { BrandsComponent } from '../app/components/manage/brands/brands.component';
import { BrandFormComponent } from '../app/components/manage/brand-form/brand-form.component';

export const routes: Routes = [
  // =========================
  // Public routes
  // =========================
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },

  // =========================
  // Authentication
  // =========================
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // =========================
  // Customer (Protected)
  // =========================
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: CustomerProfileComponent,
    canActivate: [authGuard]
  },

  // =========================
  // Admin (Protected)
  // =========================
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/products',
    component: ProductsComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/products/:id/edit',
    component: ProductFormComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/categories/new',
    component: CategoryFormComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/categories/:id/edit',
    component: CategoryFormComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/brands',
    component: BrandsComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/brands/new',
    component: BrandFormComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/brands/:id/edit',
    component: BrandFormComponent,
    canActivate: [authGuard, adminGuard]
  },

  // =========================
  // Fallback
  // =========================
  { path: '**', redirectTo: '' }
];
