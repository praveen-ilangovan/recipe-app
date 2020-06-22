import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
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
