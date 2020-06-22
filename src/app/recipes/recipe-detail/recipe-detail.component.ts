import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from '../../shared/services/recipe.service';
import { ShoppingListService } from '../../shared/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService,
              private recipeServie: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.recipe = this.recipeServie.recipes[+params['index']];
    //   }
    // );

    // Lets pipe the output and get a recipe
    this.route.params.pipe(map( (params: Params) => {
        return this.recipeServie.recipes[+params['index']]}
    )).subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
      }
    );
  }

  addToShoppingList() {
      for (const ing of this.recipe.ingredients) {
          this.shoppingListService.addIngredient(ing);
      }
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    const index = +this.route.snapshot.params['index'];
    this.recipeServie.deleteRecipe(index);
  }

}
