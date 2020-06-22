import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Recipe } from '../../shared/models/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model';
import { RecipeService } from '../../shared/services/recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  recipeForm: FormGroup;
  validImageTypes = ['jpg', 'jpeg', 'png'];

  editMode = false;
  formTitle: string;
  submitButtonText: string;
  recipe: Recipe

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    // Define the recipe form
    this.recipeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      imagePath: new FormControl(null, [Validators.required, this.filepathValidator.bind(this)]),
      ingredients: new FormArray([])
    });

    // Check the mode
    this.editMode = this.route.snapshot.url.length === 2;
    this.formTitle = this.editMode ? "Update recipe" : "Add a new recipe"
    this.submitButtonText = this.editMode ? "Update Recipe" : "Add Recipe"

    // If in edit mode, populate the form
    if (this.editMode)
      this.populateForm();
  }

  // Populate the form
  populateForm() {
    const index = this.route.snapshot.params['index'];
    this.recipe = this.recipeService.recipes[index];

    this.recipeForm.setValue({name: this.recipe.name,
                              description: this.recipe.description,
                              imagePath: this.recipe.imagePath,
                              ingredients: []});

    // Add ingredients
    let ingredients = [];
    if (this.recipe.ingredients) {
      for (let i of this.recipe.ingredients) {
        this.onAddIngredient();
        ingredients.push({name: i.name, amount: i.amount})
      }
     }
    (<FormArray>(this.recipeForm.get('ingredients'))).setValue(ingredients);
  }

  // Ingredients
  onAddIngredient() {
    const ingredientGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required)
    });

    (<FormArray>this.recipeForm.get('ingredients')).push(ingredientGroup);
  }

  getIngredientGroups() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  // On Submission
  onSubmit() {
    if (!this.editMode)
      this.addRecipe()
    else
      this.updateRecipe()
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // Add recipe
  addRecipe() {
    // Grab the ingredients and convert them to type ingredient
    let ingredients = []
    for (let i of this.recipeForm.value.ingredients) {
      ingredients.push(new Ingredient(i.name, i.amount))
    }

    // Create a new recipe item
    const r = new Recipe(this.recipeForm.value.name,
                         this.recipeForm.value.description,
                         this.recipeForm.value.imagePath,
                         ingredients);

    // Add it to the recipe service
    this.recipeService.addRecipe(r);

    console.log(this.recipeService.recipes);

    // Re route
    this.router.navigate(['../', this.recipeService.recipes.length - 1], {relativeTo: this.route});
  }

  // Update recipe
  updateRecipe() {
    // Grab the ingredients and convert them to type ingredient
    let ingredients = []
    for (let i of this.recipeForm.value.ingredients) {
      ingredients.push(new Ingredient(i.name, i.amount))
    }

    this.recipe.name = this.recipeForm.value.name;
    this.recipe.description = this.recipeForm.value.description;
    this.recipe.imagePath = this.recipeForm.value.imagePath;
    this.recipe.ingredients = ingredients;

    // Update the recipe
    this.recipe.updated = true;

    // Re route
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // Custom file validator
  filepathValidator(control: FormControl): {[s: string] : boolean} {
    if (!control.value)
      return null
    const splits = control.value.split(".");
    if (this.validImageTypes.indexOf(splits[splits.length - 1]) === -1)
      return {"invalidFileType" : true}
  }
}
