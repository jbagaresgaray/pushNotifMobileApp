import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { Page2Page } from './page2.page';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: Page2Page,
  },
];

@NgModule({
  declarations: [Page2Page],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class Page2Module {}
