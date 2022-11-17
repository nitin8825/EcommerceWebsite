import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@final-project/orders';
import { Product, ProductsService } from '@final-project/products';

@Component({
    selector: 'eshop-product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit {
    product: Product;
    quantity = 1;
    constructor(private prodService: ProductsService, private route: ActivatedRoute, private cartService: CartService) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params.productid) {
                this._getProduct(params.productid);
            }
        });
    }

    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: this.quantity
        };

        this.cartService.setCartItem(cartItem);
    }

    private _getProduct(id: string) {
        this.prodService.getProduct(id).subscribe((resProduct) => {
            this.product = resProduct;
        });
    }
}
