import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { ContactComponent} from './contact/contact.component';
import { LoginComponent} from './login/login.component';
import { CategoryDetailsComponent} from './category-details/category-details.component';


const routes: Routes = [
  {path : '' , component: HomeComponent},
  {path : 'Contact', component: ContactComponent},
  {path : 'Login', component: LoginComponent},
  {path: 'detailCategory/:id', component: CategoryDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
