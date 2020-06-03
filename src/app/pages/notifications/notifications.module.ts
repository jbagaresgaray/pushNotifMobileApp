import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsPage } from './notifications.page';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPage,
  },
];

@NgModule({
  declarations: [NotificationsPage],
  imports: [IonicModule, CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsModule {}
