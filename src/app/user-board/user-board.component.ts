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
  private _topic = collection(this.db, 'topic');
  _topicList: any[] = [];
  inputId = '';

  constructor() {}

  async ngOnInit() {
    let a = await getDocs(query(this._topic));
    a.forEach(_ => { this._topicList.push(_.data())});
    this._topicList.sort((a, b) => b.id - a.id);
  }

  inputChange() {
    return !this.inputId || this._topicList.find(t => t.id == this.inputId);
  }

  createNewTopic() {
    let newTopic = {
      id: +this.inputId,
      owner: localStorage.getItem('zzz'),
    }
    setDoc(doc(this._topic), newTopic);
    this.router.navigateByUrl(`/topic/${this.inputId}`);
  }

  goTopic(id: any) {
    this.router.navigateByUrl(`/topic/${id}`);
  }

  goback() {
    this.router.navigateByUrl('/scrum');
  }

}
