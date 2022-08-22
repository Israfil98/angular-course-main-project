import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredients(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
