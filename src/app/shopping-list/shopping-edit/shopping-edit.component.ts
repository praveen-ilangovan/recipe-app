import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) form: NgForm;
  selectedIng: Ingredient;
  selectedIndex: number;
  editMode = false;
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingredientSelected.subscribe(
      (index) => {
        this.editMode = true;
        this.selectedIndex = index;
        this.selectedIng = this.shoppingListService.ingredients[index];
        this.form.setValue({name: this.selectedIng.name, amount: this.selectedIng.amount});
      }
     )
  }

  onAddClicked() {
      const ing = new Ingredient(this.form.value.name, this.form.value.amount);
      if (this.editMode)
        this.updateIngredient(ing);
      else
        this.addIngredient(ing);

      this.editMode = false;
      this.selectedIndex = null;
      this.selectedIng = null;
      this.form.reset();
  }

  addIngredient(ing: Ingredient) {
      this.shoppingListService.addIngredient(ing);
  }

  updateIngredient(ing: Ingredient) {
      this.shoppingListService.ingredients[this.selectedIndex] = ing;
  }

  onDeletedClicked() {
    if (!this.selectedIng)
      return

    if (this.form.value.name === this.selectedIng.name && this.form.value.amount === this.selectedIng.amount){
      this.shoppingListService.ingredients.splice(this.selectedIndex, 1);
      this.selectedIndex = null;
      this.selectedIng = null;
      this.form.reset();
    }
  }

  onClearClicked() {
      this.shoppingListService.clearAll();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
