import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
  shoppingList: ShoppingListState;
}

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number | null;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Potatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: null,
};

export function shoppingListReducer(
  state: ShoppingListState = initialState,
  action: ShoppingListActions.ShoppingListActionTypes
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: null,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingr, index) => index !== state.editedIngredientIndex
        ),
        editedIngredient: null,
        editedIngredientIndex: null,
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload,
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: null,
      };
    default:
      return state;
  }
}
