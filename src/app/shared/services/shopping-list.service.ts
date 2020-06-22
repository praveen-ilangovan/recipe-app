import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredients: Ingredient[] = [];
  selectedIndex: number;
  ingredientSelected = new Subject<number>();

  constructor() { }

  addIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
  }

  clearAll() {
      this.ingredients = [];
  }

  selectIngredient(index: number) {
      this.selectedIndex = index
      this.ingredientSelected.next(this.selectedIndex);
      console.log(index);
  }
}
