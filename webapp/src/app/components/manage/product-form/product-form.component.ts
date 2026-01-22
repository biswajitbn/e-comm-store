import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Brand } from '../../../types/brand';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, CommonModule,MatCheckboxModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute); // ✅ corrected here
  router = inject(Router);
  productService = inject(ProductService);
  brandService = inject(BrandService);
  categoryService = inject(CategoryService); // ✅ fixed typo (was "categoriService")

  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
    isFeature:[false],
    isNewProduct: [false],
  });

  brands: Brand[] = [];
  categories: Category[] = [];
  id!: string;

  ngOnInit() {

    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });

    this.brandService.getBrands().subscribe((result) => {
      this.brands = result;
    });

    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.id);

    if (this.id) {
      this.productService.getProductById(this.id).subscribe((result) => {
        for (let i = 0; i < result.images.length; i++){
          this.addImage();
        }
        this.productForm.patchValue(result as any);
      })
    } else {
      this.addImage();
    }
  }

  addProduct() {
    const value = this.productForm.value;
    console.log(value);
    this.productService.addProduct(value as any).subscribe(() => {
      alert('product added');
      this.router.navigateByUrl('/admin/products');
    });
  }

  updateProduct() {
    const value = this.productForm.value;
    console.log(value);
    this.productService.updateProduct(this.id,value as any).subscribe(() => {
      alert('product updated');
      this.router.navigateByUrl('/admin/products');
    });
  }

  addImage() {
    this.images.push(this.formBuilder.control(null));
  }

  removeImage() {
    this.images.removeAt(this.images.length - 1);
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }
}
