import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@final-project/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted: boolean = false;
    editmode: boolean = false;
    currentCategoryId: string;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#ffffff']
        });
        this._checkEditMode();
    }
    onSubmit() {
        const category: Category = {
            id: this.currentCategoryId,
            name: this.form.controls.name.value,
            icon: this.form.controls.icon.value,
            color: this.form.controls.color.value
        };

        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }

        if (this.editmode) {
            this._updateCategory(category);
        } else {
            this._addCategory(category);
        }
    }
    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editmode = true;
                this.currentCategoryId = params.id;
                this.categoryService.getCategory(params.id).subscribe((category) => {
                    this.form.controls.name.setValue(category.name);
                    this.form.controls.icon.setValue(category.icon);
                    this.form.controls.color.setValue(category.color);
                });
            }
        });
    }

    private _updateCategory(category) {
        this.categoryService.updateCategory(category).subscribe(
            (response) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Successfully Updated!' });
                timer(1000)
                    .toPromise()
                    .then((done) => {
                        this.location.back();
                    });
            },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category not Updated!' });
            }
        );
    }

    private _addCategory(category) {
        this.categoryService.createCategory(category).subscribe(
            (response) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Successfully Created.' });
                timer(1000)
                    .toPromise()
                    .then((done) => {
                        this.location.back();
                    });
            },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category not Created.' });
            }
        );
    }
}
