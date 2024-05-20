import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AuctionListComponent } from './components/auction-list/auction-list.component';
import { AuctionDetailComponent } from './components/auction-detail/auction-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HistoryComponent } from './components/history/history.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuctionCreatorComponent } from './components/auction-creator/auction-creator.component';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'auction-list', component: AuctionListComponent },
  { path: 'auction-details', component: AuctionDetailComponent },
  { path: 'auction-details/:auctionId', component: AuctionDetailComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'auction-creator', component: AuctionCreatorComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }, // Unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
