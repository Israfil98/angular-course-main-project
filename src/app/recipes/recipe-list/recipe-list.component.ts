import { Component, OnInit } from '@angular/core';

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
      'This is a test description',
      'https://andyeklund.com/wp-content/uploads/2017/02/Recipes-Title.png'
    ),
    new Recipe(
      'A test Recipe 2',
      'This is a test description',
      'https://andyeklund.com/wp-content/uploads/2017/02/Recipes-Title.png'
    ),
    new Recipe(
      'A test Recipe 3',
      'This is a test description',
      'https://andyeklund.com/wp-content/uploads/2017/02/Recipes-Title.png'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
