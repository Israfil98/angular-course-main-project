import { Injectable, EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  selectedRecipe = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chicken-schnitzel-with-coleslaw-f9971cf.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Burger',
      'Juicy-tasty and big burger',
      'https://assets.epicurious.com/photos/556dd2d1d8348b711704fee9/4:3/w_1776,h_1332,c_limit/56389604_insanity-burger_6x4.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Cheese', 2)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
