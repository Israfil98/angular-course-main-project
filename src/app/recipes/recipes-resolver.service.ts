import { Actions, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { DataStorageService } from './../shared/data-storage.service';
import * as fromApp from './../store/app.reducer';
import * as RecipesActions from './../recipes/store/recipes.actions';

@Injectable({ providedIn: 'any' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  recipes: Recipe[];

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    // const recipes = this.recipeService.getRecipes();
    this.store
      .select('recipes')
      .pipe(map((recipesState) => recipesState.recipes))
      .subscribe((recipes) => (this.recipes = recipes));

    if (this.recipes.length === 0) {
      // return this.dataStorageService.fetchData();
      this.store.dispatch(new RecipesActions.FetchRecipes());
      return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
    } else {
      return this.recipes;
    }
  }
}
