import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { Form1Component } from './form1/form1.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentComponent } from './content/content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule,MatPaginator } from '@angular/material/paginator';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
//import { DataSource } from '@angular/cdk/collections';
////import { httpInterceptorProviders } from './interceptors/auth-interceptor';
//import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideUserIdleConfig } from 'angular-user-idle';
//import { JwtHelperService} from '@auth0/angular-jwt';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
//import { AuthserviceService } from './authservice.service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    Form1Component,
    ContentComponent,  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [AuthInterceptorProvider/*,JwtHelperService*/,provideUserIdleConfig({ idle: 600, timeout: 30, ping: 5 })],
  bootstrap: [AppComponent]
})
export class AppModule {
  /*constructor(private authService:AuthserviceService){}
  log_in=this.authService.isLoggedIn$;*/
}