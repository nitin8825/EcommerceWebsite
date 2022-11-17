/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styles: []
})
export class FeaturedProductsComponent implements OnInit {
    featuredProducts: Product[] = [];
    constructor(private prodService: ProductsService) {}

    ngOnInit(): void {
        this._getFeaturedProducts();
    }
    private _getFeaturedProducts() {
        this.prodService
          .getFeaturedProducts(4)
          .subscribe((products) => {
            this.featuredProducts = products;
          });
      }
}
