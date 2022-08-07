import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RecipeService } from './../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeData() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://angular-course-main-project-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
