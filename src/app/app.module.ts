import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './FRONT-OFFICE/nav/nav.component';
import { HomeComponent } from './FRONT-OFFICE/home/home.component';
import { ContactComponent } from './FRONT-OFFICE/contact/contact.component';
import { FooterComponent } from './FRONT-OFFICE/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {CategoryDetailsComponent} from './FRONT-OFFICE/category-details/category-details.component';
import {CategoryListComponent} from './FRONT-OFFICE/category-list/category-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiniPanierComponent } from './FRONT-OFFICE/mini-panier/mini-panier.component';
import {ProductListComponent} from './FRONT-OFFICE/product-list/product-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuItem, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {
  MatButtonToggleModule,
  MatDatepickerModule, MatDialogModule,
  MatGridListModule,
  MatIconModule, MatNativeDateModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';
import {LoginComponent} from './FRONT-OFFICE/register-Login/login/login.component';
import {RegisterComponent} from './FRONT-OFFICE/register-Login/register/register.component';
import {RegisterLoginComponent} from './FRONT-OFFICE/register-Login/register-login.component';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';
import {MatPassToggleVisibilityComponent, MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';
import {DialogComponent} from './FRONT-OFFICE/register-Login/dialog.component';
import {CreateCategoryComponent} from './BACK-OFFICE/create-category/create-category.component';
import {CreateProductComponent} from './BACK-OFFICE/create-product/create-product.component';
import {ProductDetailsComponent} from './BACK-OFFICE/product-details/product-details.component';
import {UpdateCategoryComponent} from './BACK-OFFICE/update-category/update-category.component';
import {UpdateProductComponent} from './BACK-OFFICE/update-product/update-product.component';
import {ProductListBACKComponent} from './BACK-OFFICE/product-list-BACK/product-list.component';
import {CategoryListBACKComponent} from './BACK-OFFICE/category-list-BACK/category-list.component';
import {CategoryDetailsBACKComponent} from './BACK-OFFICE/category-details-BACK/category-details.component';
import {BACKOFFICEComponent} from './BACK-OFFICE/back-office.component';


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
    LoginComponent,
    RegisterComponent,
    RegisterLoginComponent,
    DialogComponent,
    CreateCategoryComponent,
    CreateProductComponent,
    CategoryDetailsComponent,
    CategoryListBACKComponent,
    ProductDetailsComponent,
    UpdateCategoryComponent,
    UpdateProductComponent,
    ProductListComponent,
    ProductListBACKComponent,
    CategoryDetailsBACKComponent,
    BACKOFFICEComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, MatButtonModule, MatMenuModule, MatGridListModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatRadioModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    ShowHidePasswordModule,
    MatPasswordStrengthModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialModule, MatDialogModule

  ],
  entryComponents: [DialogComponent],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    } as RecaptchaSettings,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
