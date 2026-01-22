import { Component, inject, Inject, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Brand } from '../../../types/brand';
import { BrandService } from '../../../services/brand.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/product';

@Component({
  selector: 'app-products',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatButtonModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  displayedColumns: string[] = ['id', 'name','shortDescription','price','discount', 'action'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productService = inject(ProductService);

  constructor() {  
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit(){
    this.getServerData();
  }

  private getServerData() {
    this.productService.getAllProducts().subscribe((result) => {
      console.log(result);
      this.dataSource.data = result;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id:string){
    console.log(id);
    this.productService.deleteProductById(id).subscribe((result:any) => {
      alert("Product deleted");
      this.getServerData();
    })
  }
}
