import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabPagesPage } from './pages/tab-pages/tab-pages.page';

const routes: Routes = [
  {
    path: 'main',
    component: TabPagesPage,
    children: [
      { path: '', redirectTo: '/main/home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./pages/notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: 'page2',
        loadChildren: () =>
          import('./pages/page2/page2.module').then((m) => m.Page2Module),
      },
      {
        path: 'details',
        loadChildren: () =>
          import('./pages/details/details.module').then((m) => m.DetailsModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/main/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
