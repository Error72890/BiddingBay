import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AuctionListComponent } from './components/auction-list/auction-list.component';
import { AuctionDetailComponent } from './components/auction-detail/auction-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuctionCreatorComponent } from './components/auction-creator/auction-creator.component';
import { CategoriesComponent } from './components/categories/categories.component';

import { SessionGuard } from './guards/session.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'auction-list', component: AuctionListComponent },
  { path: 'auction-details', component: AuctionDetailComponent },
  { path: 'auction-details/:auctionId', component: AuctionDetailComponent },
  { path: 'auction-list/:category', component: AuctionListComponent },
  { path: 'auction-list/search/:itemName', component: AuctionListComponent },
  { path: 'user-profile', canActivate: [SessionGuard], component: UserProfileComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'auction-creator', canActivate: [SessionGuard], component: AuctionCreatorComponent },
  { path: 'settings', canActivate: [SessionGuard], component: SettingsComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }, // Unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
