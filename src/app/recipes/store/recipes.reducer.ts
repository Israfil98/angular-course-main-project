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
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.id],
        ...action.payload.newRecipe,
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.id] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes,
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe, index) => index !== action.payload
        ),
      };
    default:
      return state;
  }
}
