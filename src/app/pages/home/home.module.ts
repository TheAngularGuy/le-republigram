import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HomePageRoutingModule} from './home-routing.module';

import {HomePage} from './home.page';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {FootTextModule} from '../../components/foot-text/foot-text.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FootTextModule,
  ],
  declarations: [
    HomePage,
  ],
  providers: [
    ImagePicker,
  ]
})
export class HomePageModule {
}
