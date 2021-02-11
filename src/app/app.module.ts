import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFireAnalyticsModule, APP_NAME,
  APP_VERSION,
  CONFIG,
  DEBUG_MODE,
  ScreenTrackingService,
} from '@angular/fire/analytics';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },


    // firebase
    ScreenTrackingService,
    { provide: CONFIG, useValue: { anonymize_ip: true } },
    { provide: DEBUG_MODE, useValue: true },
    { provide: APP_VERSION, useValue: '0.0.1' },
    { provide: APP_NAME, useValue: environment.firebaseConfig.projectId },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
