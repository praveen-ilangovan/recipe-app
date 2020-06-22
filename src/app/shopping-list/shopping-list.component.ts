import { Component } from '@angular/core';

import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {

  constructor(private shoppingListService: ShoppingListService) { }

  getIngredients(): Ingredient[] {
    return this.shoppingListService.ingredients;
  }

  onIngredientSelected(index: number) {
      this.shoppingListService.selectIngredient(index);
  }
}
