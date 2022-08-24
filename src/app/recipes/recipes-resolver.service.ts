import { Actions, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import * as fromApp from './../store/app.reducer';
import * as RecipesActions from './../recipes/store/recipes.actions';

@Injectable({ providedIn: 'any' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  recipes: Recipe[];

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => recipesState.recipes),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
