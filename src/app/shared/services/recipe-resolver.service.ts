import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<void> {

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      // Very important to make sure we don't lose the existing unsaved data
      if (this.recipeService.recipes.length > 0) {
          return null;
      }

      return this.dataStorageService.fetchRecipes();
  }
}
