import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  // Subjects
  recipesSaved = new Subject<void>();
  recipeUpdated = new Subject<void>();
  recipseFetched = new Subject<void>();

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  saveRecipes() {
    for (const recipe of this.recipeService.recipes) {
      const recipeId = recipe.id
      const updated = recipe.updated;

      // Clean up recipe
      delete recipe.id
      delete recipe.updated;

      // Save only the recipes that are new or updated..
      if (recipeId) {
          if (updated) {
              console.log("Recipe needs updating..",recipe.name);
              this.updateRecipe(recipeId, recipe);
          } else {
              console.log("Recipe doesn't need saving..",recipe.name);
          }
          continue;
      }

      this.http.post<{name: string}>(
          "https://recipes-4ec1a.firebaseio.com/recipes.json",
          recipe
      ).subscribe(
          responseData => {
            console.log("Hello")
            this.recipesSaved.next();
          },
          errorData => {
            console.log(errorData);
          })
    }

    // Remove the deletedRecipes
    const idsToDelete = Object.keys(this.recipeService.deletedRecipes);
    for (const recipeId of idsToDelete) {
        this.deleteRecipe(recipeId);
    }
  }

  updateRecipe(recipeId: string, recipe: Recipe) {
      this.http.put(
          "https://recipes-4ec1a.firebaseio.com/recipes/" + recipeId + ".json",
          recipe
      ).subscribe(responseData => {
          this.recipeUpdated.next();
      })
  }

  fetchRecipes() {
     return this.http.get(
         "https://recipes-4ec1a.firebaseio.com/recipes.json"
     ).pipe(map(responseData => {
      this.recipeService.recipes = []

      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          this.recipeService.recipes.push({...responseData[key], id: key});
        }
      }
     }))
  }

  deleteRecipe(recipeId: string) {
      this.http.delete(
          "https://recipes-4ec1a.firebaseio.com/recipes/" + recipeId + ".json"
      ).subscribe(responseData => {
          delete this.recipeService.deletedRecipes[recipeId];
      })
  }
}
