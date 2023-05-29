import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, setDoc, getDocs, query, where, getDoc } from "@angular/fire/firestore";
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.scss'],
})
export class UserBoardComponent {

  private router = inject(Router);
  private db = inject(Firestore);
  private _knox = collection(this.db, 'knox');
  private _userList: any[] = [];
  inputUser = '';

  constructor() {}

  async ngOnInit() {
    let a = await getDocs(query(this._knox, where("status", "==", true)));
    a.forEach(_ => { this._userList.push(_.id)});
  }

  inputChange() {
    return this._userList.includes(this.inputUser);
  }

  goback() {
    this.router.navigateByUrl('/scrum')
  }

}
