import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { HnResolver } from './Services/hn.resolver';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {UserComponent} from './user/user.component';
export const appRoutes: Routes = [
 { path: '', redirectTo: './dashboard', pathMatch: 'full'},
  { path: 'home', component: HomeComponent , data: { animation: 'home' }},
  { path: 'about', component: AboutComponent , data: { animation: 'about' } },
  { path: 'dashboard', component: DashboardComponent , resolve: { hnData: HnResolver } , data: { animation: 'dashboard' }},
  { path: 'login', component: LoginComponent , data: { animation: 'login' }},
  { path: 'register', component: RegisterComponent , data: { animation: 'register' }},
  { path: 'user', component: UserComponent , data: { animation: 'user' }},
  { path: '**', redirectTo: './dashboard'},
];
