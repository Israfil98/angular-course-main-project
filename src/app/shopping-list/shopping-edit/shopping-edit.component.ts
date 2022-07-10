import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { Ingredient } from './../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  @Output() addedIngredient = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit(): void {}

  onAddItem() {
    const nameOfIngredient = this.nameInputRef.nativeElement.value;
    const amountOfIngredient = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(nameOfIngredient, amountOfIngredient);
    this.addedIngredient.emit(newIngredient)
  }
}
