import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // ✅ Import select
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import { CategoryService } from '../../../services/category.service'; // ✅ Import category service
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-form',
  imports: [FormsModule, MatInputModule, MatButtonModule, MatSelectModule,CommonModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
  name!: string;
  id!: string;

  // ✅ Category properties
  categoryId!: string;
  categories: any[] = [];

  brandsService = inject(BrandService);
  categoryService = inject(CategoryService); // ✅ inject category service
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.loadCategories(); // ✅ load categories

    if (this.id && this.id.trim().length === 24) {
      this.brandsService.getBrandById(this.id).subscribe(result => {
        this.name = result.name;
        this.categoryId = result.categoryId; // ✅ prefill category if editing
      });
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      console.log('Loaded categories:', res); // ✅ Log response
      this.categories = res;
    });
  }

  add() {
    const payload = { name: this.name, categoryId: this.categoryId }; // ✅ include category
    this.brandsService.addBrand(payload).subscribe(() => {
      alert("brand added");
      this.router.navigateByUrl("/admin/brands");
    });
  }

  update() {
    const payload = { name: this.name, categoryId: this.categoryId }; // ✅ include category
    this.brandsService.updateBrand(this.id, payload).subscribe(() => {
      alert("brand updated");
      this.router.navigateByUrl("/admin/brands");
    });
  }
}
