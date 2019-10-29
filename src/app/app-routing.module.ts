import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SteamidFormComponent } from './steamid-form/steamid-form.component';
import { CompareUsersComponent } from './compare-users/compare-users.component';


const routes: Routes = [
  {path:'', component: SteamidFormComponent},
  {path:'compare', component: CompareUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
