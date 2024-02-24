import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './public/main/main.component';

const routes: Routes = [
  {path: '',component:MainComponent,
children:[
  
] },
  {path: 'login',component: LoginComponent},
  {path: '',component: AdminComponent,
  children:[
  {path:'dashboard',component:DashboardComponent},
  {path: 'category', component: CategoryComponent},
  {path:  'product' , component: ProductComponent},
  {path: 'user', component: UserComponent},
]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
