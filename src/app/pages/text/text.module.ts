import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextPageRoutingModule } from './text-routing.module';

import { TextPage } from './text.page';
import {FootTextModule} from '../../components/foot-text/foot-text.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextPageRoutingModule,
    FootTextModule,
  ],
  declarations: [TextPage]
})
export class TextPageModule {}
