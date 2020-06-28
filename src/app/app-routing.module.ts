import { SmsCreateComponent } from './sms/sms-create/sms-create.component';
import { SmsListComponent } from './sms/sms-list/sms-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: SmsListComponent },
  { path: 'create', component: SmsCreateComponent },
  { path: 'edit/:id', component: SmsCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
