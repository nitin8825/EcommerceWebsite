import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@final-project/products';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}
    categories: Category[] = [];
    ngOnInit(): void {
        this._getCategories();
    }

    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).subscribe(
                    (response) => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Successfully Deleted!' });
                        this._getCategories();
                    },
                    (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category not Deleted!' });
                    }
                );
            },
            reject: (type) => {}
        });
    }

    updateCategory(categoryid: string) {
        this.router.navigateByUrl(`categories/form/${categoryid}`);
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }
}
