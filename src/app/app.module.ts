import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';

import { GeofenceDetailsPage } from "../pages/geofence-details/geofence-details";
import { GeofenceListItem } from "../components/geofence-list-item/geofence-list-item";
import { GeofenceListPage } from "../pages/geofence-list/geofence-list";
import { GeofenceService } from "../services/geofence-service";
// import { HomePage } from '../pages/home/home';

// const components = [
//   MyApp,
//   GeofenceDetailsPage,
//   GeofenceListPage,
//   GeofenceListItem
// ]



@NgModule({
  declarations: [
    MyApp,
    
    GeofenceDetailsPage,
    GeofenceListPage,
    GeofenceListItem
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   
    GeofenceDetailsPage,
    GeofenceListPage,
    GeofenceListItem
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
       
    {provide: ErrorHandler, useClass: IonicErrorHandler},
        GeofenceService

  ]
})
export class AppModule {}
