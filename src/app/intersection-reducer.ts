import { Action } from '@ngrx/store';

export interface IntersectionState {
  vehicle: string;
  pedestrian: string;
}

const defaultState = {
  vehicle: 'green',
  pedestrian: 'red'
};

export function intersectionReducer(state = defaultState, action: Action) {
  switch (action.type) {
    case 'PEDESTRIAN':
      return state = { vehicle: 'stop', pedestrian: 'pressed' };
    case 'STOPPED': {
      return state = { vehicle: 'stop', pedestrian: 'walk' };
    }
    case 'GO': {
      return state = { vehicle: 'go', pedestrian: 'stop' };
    }
    default:
      return defaultState;
  }
}
