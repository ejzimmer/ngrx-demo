import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { intersectionReducer } from './intersection-reducer';
import { TrafficLightsComponent } from './traffic-lights/traffic-lights.component';
import { PedestrianLightComponent } from './pedestrian-light/pedestrian-light.component';


@NgModule({
  declarations: [
    AppComponent,
    TrafficLightsComponent,
    PedestrianLightComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
   StoreModule.forRoot({ intersection: intersectionReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
