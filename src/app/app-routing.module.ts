import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './names/list/list.component';
import { EditComponent } from './names/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'names', pathMatch: 'full' },
  { path: 'names', component: ListComponent },
  { path: 'names/novo', component: EditComponent },
  { path: 'names/edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
