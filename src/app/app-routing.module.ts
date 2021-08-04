
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {WelcomeComponent} from './welcome/welcome.component';


const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: ':username', component: WelcomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
