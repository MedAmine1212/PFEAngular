import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {CategoryListComponent} from './category-list/category-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiniPanierComponent } from './mini-panier/mini-panier.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    ContactComponent,
    FooterComponent,
    CategoryDetailsComponent,
    CategoryListComponent,
    MiniPanierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
