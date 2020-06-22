import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';

import { RecipeResolverService } from '../shared/services/recipe-resolver.service';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
        {path: 'new', component: NewRecipeComponent},
        {path: ':index', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
        {path: ':index/edit', component: NewRecipeComponent , resolve: [RecipeResolverService]}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
