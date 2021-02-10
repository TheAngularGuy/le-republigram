import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FootTextComponent} from './foot-text.component';

@NgModule({
  declarations: [FootTextComponent],
  exports: [FootTextComponent],
  imports: [
    CommonModule
  ]
})
export class FootTextModule { }
