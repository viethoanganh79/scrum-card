import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, setDoc, getDocs, query, where, getDoc } from "@angular/fire/firestore";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user-sign.component.html',
  styleUrls: ['./user-sign.component.scss'],
})
export class UserSignComponent {

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

  gotoBoard() {
    localStorage.setItem('zzz', this.inputUser);
    this.router.navigateByUrl('/topic');
  }

}
