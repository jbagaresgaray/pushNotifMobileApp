import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DetailsPage } from './details.page';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: DetailsPage,
  },
];

@NgModule({
  declarations: [DetailsPage],
  imports: [IonicModule, CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsModule {}
