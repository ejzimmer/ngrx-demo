import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store } from '@ngrx/store';
import { IntersectionState } from './intersection-reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  values = [1, 2, 3, 4];
  syncObservable = Observable.from(this.values);
  asyncObservable = Observable.interval(1000);
  subscription;
  amiibo = { name: '' };
  url: string;
  intersection: Observable<IntersectionState>;

  constructor(private http: HttpClient, private store: Store<{ intersection: IntersectionState }>) {
    this.intersection = this.store.select('intersection');
  }

  ngOnInit() {
    Observable.fromEvent(document.getElementById('clicker'), 'click')
      .subscribe((event: any) => console.log(`${event.target} was clicked!`));
  }

  startSync() {
    console.log('start sync');
    this.syncObservable.subscribe(x => console.log(x));
    console.log('end sync');    
  }

  startAsync() {
    console.log('start async');
    this.subscription = this.asyncObservable.subscribe(x => console.log(x));
    console.log('end async');
  }

  getAmiibo() {
    this.http.get(`http://www.amiiboapi.com/api/amiibo/?name=${this.amiibo.name}`, { headers: { 'Access-Control-Allow-Origin': '*' }})
      .subscribe((response: any) => this.url = response.amiibo[0].image);
  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }
}
