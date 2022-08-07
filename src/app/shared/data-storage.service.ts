import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

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

  fetchData() {
    return this.http
      .get<Recipe[]>(
        'https://angular-course-main-project-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((res) => {
          console.log(res);
          this.recipeService.setRecipes(res);
        })
      );
  }
}
