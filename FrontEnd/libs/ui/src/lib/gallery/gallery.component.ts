import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ui-gallery',
    templateUrl: './gallery.component.html',
    styles: []
})
export class GalleryComponent implements OnInit {
    selectedImageUrl: string | undefined;

    @Input()
    images!: string;
    constructor() {}

    ngOnInit(): void {
        if (this.hasImages) {
            this.selectedImageUrl = this.images;
        }
    }

    addProductToCart() {}

    changeSelectedImage(imageUrl: string) {
        this.selectedImageUrl = imageUrl;
    }

    get hasImages() {
        return this.images;
    }
}
