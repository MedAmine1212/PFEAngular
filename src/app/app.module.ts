import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {CategoryListComponent} from './category-list/category-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiniPanierComponent } from './mini-panier/mini-panier.component';
import { ProductListComponent } from './product-list/product-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuItem, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ContactComponent,
    FooterComponent,
    CategoryDetailsComponent,
    CategoryListComponent,
    MiniPanierComponent,
    ProductListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, MatButtonModule, MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
