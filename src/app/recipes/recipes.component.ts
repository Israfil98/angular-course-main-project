import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  choosedRecipe: Recipe;

  constructor() {}

  ngOnInit(): void {}

  onRecipeChoosed(recipe: Recipe) {
    this.choosedRecipe = recipe;
  }
}
