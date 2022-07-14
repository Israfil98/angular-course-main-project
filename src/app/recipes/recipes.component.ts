import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  choosedRecipe: Recipe;

  constructor(private recipeSerivce: RecipeService) {}

  ngOnInit(): void {
    this.recipeSerivce.selectedRecipe.subscribe((recipe: Recipe) => {
      this.choosedRecipe = recipe;
    });
  }
}
