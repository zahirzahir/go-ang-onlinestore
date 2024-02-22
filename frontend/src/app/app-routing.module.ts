import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'dashboard',component: MainComponent},
  {path: 'category', component: CategoryComponent},
  {path:  'product' , component: ProductComponent},
  {path: 'user', component: UserComponent},
];
//export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
