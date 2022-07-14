import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  selectedRecipe = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A test Recipe 1',
      'This is a test 1 description',
      'https://andyeklund.com/wp-content/uploads/2017/02/Recipes-Title.png'
    ),
    new Recipe(
      'A test Recipe 2',
      'This is a test 2 description',
      'https://andyeklund.com/wp-content/uploads/2017/02/Recipes-Title.png'
    ),
    new Recipe(
      'A test Recipe 3',
      'This is a test 3 description',
      'https://andyeklund.com/wp-content/uploads/2017/02/Recipes-Title.png'
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
