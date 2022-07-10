import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
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

  @Output() recipeChoosed = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelect(recipe: Recipe) {
    this.recipeChoosed.emit(recipe);
  }
}
