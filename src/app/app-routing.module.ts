import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NewRecipeComponent } from './recipes/new-recipe/new-recipe.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeResolverService } from './shared/services/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
        {path: 'new', component: NewRecipeComponent},
        {path: ':index', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
        {path: ':index/edit', component: NewRecipeComponent, resolve: [RecipeResolverService]}
    ]},
    {path: 'shopping', component:  ShoppingListComponent},
    {path: 'auth', component:  AuthComponent},
    {path: 'not-found', component: ErrorPageComponent, data: {'message' : 'Page not found'}},

    {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
