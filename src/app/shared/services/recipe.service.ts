import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<void>();

  recipes: Recipe[] = [];
  deletedRecipes: {[recipeId: string] : Recipe} = {};

  constructor() { }

  // Add recipe
  addRecipe(recipe: Recipe) {
    console.log("Adding...");
    this.recipes.push(recipe);
    this.recipesChanged.next();
  }

  // DeleteRecipe
  deleteRecipe(index: number) {
      this.deletedRecipes[this.recipes[index].id] = this.recipes[index];
      this.recipes.splice(index, 1);
      this.recipesChanged.next();
      console.log("Deleting...");
  }
}
