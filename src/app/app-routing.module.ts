import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
    {path: '', component: HomeComponent},

    // Lazy loading
    {path: 'recipes',
        loadChildren: () => import("./recipes/recipes.module").then(m => m.RecipesModule)},
    {path: 'shopping',
        loadChildren: () => import("./shopping-list/shopping-list.module").then(m => m.ShoppingListModule)},
    {path: 'auth',
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)},


    {path: 'not-found', component: ErrorPageComponent, data: {'message' : 'Page not found'}},
    {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
