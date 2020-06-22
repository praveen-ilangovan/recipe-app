import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  @Input() ingredients: Ingredient[] = [];
  @Output() ingredientSelected = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientClicked(i: number) {
      this.ingredientSelected.emit(i);
  }

}
