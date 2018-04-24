import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IntersectionState } from '../intersection-reducer';

@Component({
  selector: 'app-traffic-lights',
  templateUrl: './traffic-lights.component.html',
  styleUrls: ['./traffic-lights.component.css']
})
export class TrafficLightsComponent implements OnInit {
  lit = 'green';
  intersection: Observable<IntersectionState>;

  constructor(private store: Store<{ intersection: IntersectionState }>) {
    this.intersection = this.store.select('intersection');
  }

  ngOnInit() { 
    this.intersection.subscribe((state) => {
      switch (state.vehicle) {
        case 'go':
          this.go();
          break;
        case 'stop':
          this.stop();
          break;
      }
    });
  }

  stop() {
    if (this.lit === 'green') {
      this.lit = 'orange';
      setTimeout(() => {
        this.lit = 'red';
        setTimeout(() => {
          this.store.dispatch({ type: 'STOPPED' });
        }, 2000);
      }, 3000);
    }
  }

  go() {
    setTimeout(() => {
      this.lit = 'green';
    }, 1000);
  }
}
