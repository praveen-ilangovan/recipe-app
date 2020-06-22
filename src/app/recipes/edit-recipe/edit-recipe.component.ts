import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from '../../shared/services/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  recipe: Recipe;
  changesSaved: boolean = false;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
      this.route.params.subscribe(
          (params: Params) => {
              this.recipe = this.recipeService.recipes[params['index']];
          }

    );
  }

  onUpdate() {
      this.changesSaved = true;
      this.router.navigate(['../'], {relativeTo : this.route});
  }

}
