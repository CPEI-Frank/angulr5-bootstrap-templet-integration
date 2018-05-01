import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { appRoutes } from './routerConfig';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HnResolver } from './Services/hn.resolver';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HnService } from './Services/hn.service';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService, UserService, AuthService } from './Services/index';
import { RegisterComponent } from './register/register.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    DashboardComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent,
    UserComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule, HttpClientModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  providers: [
    HnResolver, HnService, AlertService, UserService, AuthService, {  provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
   },
  ]
})
export class AppModule { }
