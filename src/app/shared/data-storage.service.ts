import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import * as fromApp from './../store/app.reducer';
import * as RecipesActions from './../recipes/store/recipes.actions';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

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
          this.store.dispatch(new RecipesActions.SetRecipes(res));
        })
      );
  }
}
