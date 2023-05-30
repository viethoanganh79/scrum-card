import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, setDoc, getDocs, query, where, getDoc, updateDoc } from "@angular/fire/firestore";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss'],
})
export class TopicDetailComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private db = inject(Firestore);
  private _topic = collection(this.db, 'topic');
  private _user = localStorage.getItem('zzz');

  selectedTopic: any;
  optPoint = [
    { selected: false, key: 1, value: '1' },
    { selected: false, key: 2, value: '2' },
    { selected: false, key: 3, value: '3' },
    { selected: false, key: 5, value: '5' },
    { selected: false, key: 8, value: '8' },
    { selected: false, key: 13, value: '13' },
    { selected: false, key: 21, value: '21' },
    { selected: false, key: -1, value: 'Quá khó' },
  ];
  selectedOpt: any;

  constructor() {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getTopic(+params['id']);
    })
  }

  async getTopic(id: any) {
    let a = await getDocs(query(this._topic, where('id', '==', id)));
    this.selectedTopic = a.docs[0].data();
  }

  voteList() {
    return this.selectedTopic?.vote;
  }

  isOwner() {
    return this.selectedTopic && this._user == this.selectedTopic.owner;
  }

  selectChange() {
    return !this.selectedOpt;
  }

  async submit() {
    let _v = {
      name: this._user,
      value: this.selectedOpt.key,
    }
    let _a = await getDocs(query(this._topic, where('id', '==', +this.selectedTopic.id)));
    let _current = _a.docs[0].data();
    let _id = _a.docs[0].id;
    if (_current['vote']) {
      let __ = (_current['vote'] as Array<any>);
      if (__.find(_ => _.name == this._user)) {
        __.forEach(_ => {
          if (_.name == this._user) {
            _.value = this.selectedOpt.key;
          }
        });
      } else {
        __.push(_v);
      }
    } else {
      _current['vote'] = [_v]
    }
    updateDoc(doc(this._topic, _id), _current);
    this.getTopic(+this.selectedTopic.id);
  }

  selectPoint(opt: any) {
    this.optPoint.forEach(_ => {
      _.selected = false;
      if (_.key == opt.key) {
        _.selected = true;
        this.selectedOpt = _;
      }
    });
  }

  async getSummary() {
    await this.getTopic(+this.selectedTopic.id);
    let _vote = (this.selectedTopic['vote'] as Array<any>).filter(_ => _.value > 0);
    let _sum = 0;
    _vote.forEach(_ => _sum += _.value);
    _sum = this.roundToNearestFibonacci(_sum/_vote.length);
    this.selectedTopic.result = _sum;
    let _a = await getDocs(query(this._topic, where('id', '==', +this.selectedTopic.id)));
    let _id = _a.docs[0].id;
    updateDoc(doc(this._topic, _id), this.selectedTopic);
    this.getTopic(+this.selectedTopic.id);
  }

  goback() {
    this.router.navigateByUrl('/topic');
  }

  roundToNearestFibonacci(number: number): number {
    // Tính các số Fibonacci nhỏ hơn hoặc bằng number
    const fibonacciNumbers: number[] = [0, 1];
    let currentFibonacci = 1;
    while (currentFibonacci <= number) {
      fibonacciNumbers.push(currentFibonacci);
      currentFibonacci = fibonacciNumbers[fibonacciNumbers.length - 1] + fibonacciNumbers[fibonacciNumbers.length - 2];
    }
    
    // Tìm số Fibonacci gần nhất với number
    let closestFibonacci = fibonacciNumbers[1];
    for (let i = 2; i < fibonacciNumbers.length; i++) {
      if (Math.abs(number - fibonacciNumbers[i]) < Math.abs(number - closestFibonacci)) {
        closestFibonacci = fibonacciNumbers[i];
      }
    }
    
    return closestFibonacci;
  }

}
