import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IntersectionState } from '../intersection-reducer';

@Component({
  selector: 'app-pedestrian-light',
  templateUrl: './pedestrian-light.component.html',
  styleUrls: ['./pedestrian-light.component.css']
})
export class PedestrianLightComponent implements OnInit {
  intersection: Observable<IntersectionState>;
  light = false;
  state: 'walk' | 'stopping' | 'stop' = 'stop';

  constructor(private store: Store<{ intersection: IntersectionState }>) {
    this.intersection = this.store.select('intersection');
  }

  ngOnInit() {
    this.intersection.subscribe(state => {
      switch(state.pedestrian) {
        case 'pressed':
          this.light = true;
          this.state = 'stop';
          break;
        case 'walk':
          this.doWalk();
          break;
        default:
          this.light = false;
          this.state = 'stop';
      }

    })
  };

  pressButton() {
    if (!this.light) {
      this.store.dispatch({ type: 'PEDESTRIAN' });
    }
  }

  doWalk() {
    this.light = true;
    this.state = 'walk';
    setTimeout(() => {
      this.state = 'stopping';
      setTimeout(() => {
        this.store.dispatch({ type: 'GO' });
      }, 3000);
    }, 5000);
  }

}
