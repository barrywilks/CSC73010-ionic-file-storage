import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ListPage } from '../pages/list/list';
import { EditPage } from '../pages/edit/edit';
import { NewPage } from '../pages/new/new';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar }    from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File }         from '@ionic-native/file';

import { PeopleData }   from './people.component';


@NgModule({
  declarations: [
    MyApp,
    ListPage,
	NewPage,
    EditPage,
	HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    NewPage,
	EditPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	File,
//    PeopleData,   // apparently this does not work in the latest version
	{provide: PeopleData, useClass: PeopleData, deps: [File]}, /* BW Kludge */
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
