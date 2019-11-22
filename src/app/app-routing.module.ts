import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { ContactComponent} from './contact/contact.component';
import { RegisterLoginComponent} from './register-Login/register-login.component';
import { CategoryDetailsComponent} from './category-details/category-details.component';


const routes: Routes = [
  {path : '' , component: HomeComponent , data: { animation: 'homeAnimation'}},
  {path : 'Contact', component: ContactComponent , data: { animation: 'contactAnimation'}},
  {path : 'Login', component: RegisterLoginComponent, data: { animation: 'loginAnimation'}},
  {path: 'detailCategory/:id', component: CategoryDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
