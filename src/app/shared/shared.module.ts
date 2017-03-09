import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClarityModule} from 'clarity-angular';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forChild()
  ],
  exports: [
    ClarityModule
  ]
})
export class SharedModule {
}
