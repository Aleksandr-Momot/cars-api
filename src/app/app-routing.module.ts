
import { CreateComponent } from './create/create.component';
import { OwnerInfoComponent } from './owner-info/owner-info.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'owner/:id', component: OwnerInfoComponent},
  {path: 'create', component: CreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
