import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    apiURLCategories = environment.apiURL + 'categories';

    constructor(private http: HttpClient) {}

    //Obervable - we are using this becauase at the time of data accessing observables are holding our data
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiURLCategories);
    }

    getCategory(categoryId: string): Observable<Category> {
        return this.http.get<Category>('http://localhost:3000/app/v1/categories/' + categoryId);
    }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>('http://localhost:3000/app/v1/categories', category);
    }

    deleteCategory(categoryId: string): Observable<Category> {
        return this.http.delete<Category>(`http://localhost:3000/app/v1/categories/${categoryId}`);
    }

    updateCategory(category: Category): Observable<Category> {
        return this.http.put<Category>('http://localhost:3000/app/v1/categories/' + category.id, category);
    }
}
