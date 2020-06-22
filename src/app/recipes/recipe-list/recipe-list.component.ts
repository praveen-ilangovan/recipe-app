import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from '../../shared/services/recipe.service';
import { DataStorageService } from '../../shared/services/data-storage.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  // Subscriptions
  fetchRecipesSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
      // Turn this on for automatic fetching of data on Init.
      this.fetchRecipesSubscription = this.dataStorageService.fetchRecipes().subscribe();
  }

  getRecipes(): Recipe[] {
    return this.recipeService.recipes;
  }

  ngOnDestroy() {
    this.fetchRecipesSubscription.unsubscribe();
  }
}
