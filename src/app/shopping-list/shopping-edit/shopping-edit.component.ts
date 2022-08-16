import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  subscription: Subscription;
  isEditMode = false;
  editingItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (id: number) => {
        this.isEditMode = true;
        this.editingItemIndex = id;
        this.editedItem = this.shoppingListService.getIngredient(id);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.isEditMode) {
      this.shoppingListService.updateIngredient(
        this.editingItemIndex,
        newIngredient
      );
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.isEditMode = false;
    form.reset();
  }

  onClear() {
    this.isEditMode = false;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editingItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
