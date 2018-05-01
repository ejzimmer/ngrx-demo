import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store } from '@ngrx/store';
import { IntersectionState } from './intersection-reducer';
import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  values = [1, 2, 3, 4];
  syncObservable = Observable.from(this.values);
  asyncObservable = Observable.interval(1000);
  subscription;
  amiibo = { name: '' };
  url: string;
  intersection: Observable<IntersectionState>;
  result: any;
  numbers = new Subject<number>();
  position = new Subject<{x: number, y: number}>();

  constructor(private http: HttpClient, private store: Store<{ intersection: IntersectionState }>) {
    this.intersection = this.store.select('intersection');
  }

  forEach() {
    this.syncObservable.forEach(val => console.log(val));
  }
  filter() {
    Observable.from(this.values)
      .filter(val => val % 2 === 0)
      .forEach(val => console.log(val));
  }

  push() { 
    this.asyncObservable.subscribe(x => this.numbers.next(x));
  }

  trackClicks() {
    Observable.fromEvent(document, 'click')
      .subscribe((event: any) => this.position.next({x: event.clientX, y: event.clientY}));
  }

  getAmiibo() {
    this.http.get(`http://www.amiiboapi.com/api/amiibo/?name=${this.amiibo.name}`, { headers: { 'Access-Control-Allow-Origin': '*' }})
      .subscribe((response: any) => this.url = response.amiibo[0].image);
  }

}
