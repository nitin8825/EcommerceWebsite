/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, OrdersService } from '@final-project/orders';

@Component({
    selector: 'orders-order-summary',
    templateUrl: './order-summary.component.html',
    styles: []
})
export class OrderSummaryComponent implements OnInit {
    payOption = 'Pay On Delivery';
    totalPrice: number;
    isCheckout = false;
    constructor(private router: Router, private cartService: CartService, private ordersService: OrdersService) {
        this.router.url.includes('checkout') ? (this.isCheckout = true) : (this.isCheckout = false);
    }

    ngOnInit(): void {
        this._getOrderSummary();
    }

    _getOrderSummary() {
        this.totalPrice = 0;

        this.cartService.getCart().items?.map((item) => {
            this.ordersService.getProduct(item.productId).subscribe((product) => {
                this.totalPrice += product.price * item.quantity;
            });
        });
    }

    navigateToCheckout() {
        this.router.navigate(['/checkout']);
    }
}
