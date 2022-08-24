import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import * as fromApp from './../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => +params['id']),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map((recipesState) => {
          return recipesState.recipes.find(
            (recipe, index) => index === this.id
          );
        })
      )
      .subscribe((recipe) => (this.recipe = recipe));
  }

  addToShoppingList() {
    this.recipeService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
