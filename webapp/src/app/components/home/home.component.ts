import { Component, ElementRef, inject, TrackByFunction, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule,MatCardModule,MatIconModule,MatButtonModule,CarouselModule,RouterLink,ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 800,
    // navText: ['‹', '›'],
    nav: false,
    items: 1
  };

  customerService = inject(CustomerService);
  newProducts: Product[]=[];
  featuredProducts:Product[]=[];
trackByFn: TrackByFunction<Product> | undefined;
item: any;
  ngOnInit(){
    this.customerService.getFeaturedProducts().subscribe((result) => {
      this.featuredProducts = result;
      console.log(this.featuredProducts)
    });

    this.customerService.getNewProducts().subscribe((result) =>{
      this.newProducts = result;
      console.log(this.newProducts);
    })
  }

  toggleFavorite(product: any) {
    product.isFavorite = !product.isFavorite;
  }  
}
