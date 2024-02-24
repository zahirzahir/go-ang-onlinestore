import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './public/main/main.component';
import { HeadComponent } from './public/layout/head/head.component';
import { FootersComponent } from './public/layout/footers/footers.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    CategoryComponent,
    ProductComponent,
    UserComponent,
    LoginComponent,
    AdminComponent,
    MainComponent,
    HeadComponent,
    FootersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //NgMultiSelectDropDownModule.forRoot()
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => {
    //       return localStorage.getItem('access_token');
    //     },
    //     allowedDomains: ['localhost:8080'],
    //     disallowedRoutes: [],
    //   },
    // }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
