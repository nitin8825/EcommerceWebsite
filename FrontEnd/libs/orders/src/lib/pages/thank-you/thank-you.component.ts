/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@final-project/users';

@Component({
    selector: 'orders-thank-you-page',
    templateUrl: './thank-you.component.html',
    styles: []
})
export class ThankYouComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit(): void {}
    ngOnDestroy(): void {
        this.authService.checkoutComplete();
    }

    checkOutDone() {
        this.authService.checkoutComplete();
    }
}
