import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {IonicModule} from '@ionic/angular';
import {FootTextModule} from '../../components/foot-text/foot-text.module';

import {ResultPageRoutingModule} from './result-routing.module';
import {ResultPage} from './result.page';
import {InAppReview} from '@ionic-native/in-app-review/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultPageRoutingModule,
    FootTextModule,
  ],
  declarations: [
    ResultPage,
  ],
  providers: [
    SocialSharing,
    InAppReview,
  ],
})
export class ResultPageModule {
}
