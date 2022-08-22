import { Recipe } from './../recipe.model';

import * as RecipesActions from './recipes.actions';

export interface RecipesState {
  recipes: Recipe[];
}

const initialState: RecipesState = {
  recipes: [],
};

export function recipesReducer(
  state: RecipesState = initialState,
  action: RecipesActions.RecipesActionTypes
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    default:
      return state;
  }
}
