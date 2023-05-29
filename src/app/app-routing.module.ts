import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "scrum",
    loadChildren: () => import('./user-sign/user-sign.module').then((m) => m.UserSignModule),
  },
  {
    path: 'board',
    loadChildren: () => import('./user-board/user-board.module').then((m) => m.UserBoardModule),
  },
  {
    path: "",
    redirectTo: "scrum",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
