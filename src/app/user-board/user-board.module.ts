import { NgModule } from '@angular/core';
import { UserBoardComponent } from './user-board.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
  { path: '', component: UserBoardComponent },
  { path: ':id', component: TopicDetailComponent },
];

@NgModule({
  declarations: [
    UserBoardComponent,
    TopicDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatListModule,
  ],
})
export class UserBoardModule { }
