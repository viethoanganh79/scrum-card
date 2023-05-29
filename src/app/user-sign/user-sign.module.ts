import { NgModule } from '@angular/core';
import { UserSignComponent } from './user-sign.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  { path: 'scrum', component: UserSignComponent }
];

@NgModule({
  declarations: [
    UserSignComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class UserSignModule { }
