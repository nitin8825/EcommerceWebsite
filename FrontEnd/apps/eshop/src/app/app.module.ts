import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@final-project/ui';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule, ProductsService } from '@final-project/products';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//PrimeNg
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { ProductPageComponent } from './pages/product-page/product-page.component';
import { OrdersModule } from '@final-project/orders';
import { MessagesComponent } from './shared/messages/messages.component';
import { MessageService } from 'primeng/api';

import { JwtInterceptor } from '@final-project/users';

//routes
const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'category/:categoryid',
        component: ProductListComponent
    },
    {
        path: 'products/:productid',
        component: ProductPageComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        ProductListComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent,
        ProductPageComponent,
        MessagesComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        UiModule,
        ProductsModule,
        HttpClientModule,
        RouterModule,
        CheckboxModule,
        FormsModule,
        RatingModule,
        InputNumberModule,
        UiModule,
        OrdersModule,
        ButtonModule,
        ToastModule
    ],
    providers: [ProductsService, MessageService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
